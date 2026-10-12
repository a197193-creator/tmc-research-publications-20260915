<?php
/**
 * Plugin Name: TMC Research Portal
 * Description: Dedicated TMC research portal page with editable research records. Existing UKM pages and theme stay available.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */
if (!defined('ABSPATH')) { exit; }
define('TMC_PORTAL_DIR', plugin_dir_path(__FILE__));
define('TMC_PORTAL_URL', plugin_dir_url(__FILE__));

function tmc_portal_types() {
    foreach (array('tmc_project' => 'TMC Projects', 'tmc_publication' => 'TMC Publications', 'tmc_news' => 'TMC Research News') as $type => $label) {
        register_post_type($type, array(
            'label' => $label, 'public' => false, 'show_ui' => true, 'show_in_menu' => true,
            'show_in_rest' => true, 'supports' => array('title', 'editor', 'revisions'),
            'capability_type' => 'post', 'map_meta_cap' => true,
        ));
    }
}
add_action('init', 'tmc_portal_types');

function tmc_portal_fields($type) {
    if ($type === 'tmc_project') {
        return array('category'=>'Research category','status'=>'Project status','targetedParticipants'=>'Study target','duration'=>'Project period','collaborators'=>'Collaborators','funding'=>'Funding','participantDataSource'=>'Participant data source','referenceUrl'=>'Public reference URL');
    }
    if ($type === 'tmc_publication') {
        return array('year'=>'Publication year','journal'=>'Journal','authors'=>'Authors','doi'=>'DOI','url'=>'Original article URL','category'=>'Browsing category','publicationStatus'=>'Publication status','articleType'=>'Article type','citationNoteEn'=>'Citation note (English)','citationNoteBm'=>'Citation note (Malay)');
    }
    return array('tag'=>'Category','date'=>'Display date','snippet'=>'Short introduction');
}

function tmc_portal_meta_boxes() {
    foreach (array('tmc_project','tmc_publication','tmc_news') as $type) {
        add_meta_box('tmc_portal_details', 'Research portal details', 'tmc_portal_fields_box', $type, 'normal', 'high');
    }
}
add_action('add_meta_boxes', 'tmc_portal_meta_boxes');

function tmc_portal_fields_box($post) {
    $record = get_post_meta($post->ID, '_tmc_record', true);
    $record = is_array($record) ? $record : array();
    wp_nonce_field('tmc_portal_save', 'tmc_portal_nonce');
    echo '<p>The title and main description use the WordPress editor above. Published records appear in the portal; drafts remain private. Current participant counts require Statistics Unit approval and are not shown.</p>';
    foreach (tmc_portal_fields($post->post_type) as $key => $label) {
        $value = isset($record[$key]) ? $record[$key] : '';
        if ($key === 'citationNoteEn') { $value = $record['citationNote']['en'] ?? ''; }
        if ($key === 'citationNoteBm') { $value = $record['citationNote']['bm'] ?? ''; }
        echo '<p><label for="tmc-'.esc_attr($key).'"><strong>'.esc_html($label).'</strong></label><br><input style="width:100%" id="tmc-'.esc_attr($key).'" name="tmc_record['.esc_attr($key).']" value="'.esc_attr($value).'" type="text"></p>';
    }
    if ($post->post_type !== 'tmc_project') { return; }
    echo '<h3>Study components</h3><div id="tmc-components">';
    $components = isset($record['subProjects']) ? $record['subProjects'] : array();
    foreach ($components as $index => $component) { tmc_portal_component_fields($index, $component); }
    echo '</div><button class="button" id="tmc-add-component" type="button">Add study component</button>';
    echo '<template id="tmc-component-template">';
    tmc_portal_component_fields('__INDEX__', array());
    echo '</template><script>document.getElementById("tmc-add-component").addEventListener("click",function(){const list=document.getElementById("tmc-components");const index=list.querySelectorAll("fieldset").length;const fragment=document.getElementById("tmc-component-template").innerHTML.replaceAll("__INDEX__",String(index));list.insertAdjacentHTML("beforeend",fragment);});</script>';
}

function tmc_portal_component_fields($index, $component) {
    echo '<fieldset style="border:1px solid #ccc;padding:12px;margin:12px 0"><legend>Study component</legend>';
    foreach (array('title'=>'Title','description'=>'Description','duration'=>'Period','targetedParticipants'=>'Study target','funding'=>'Funding') as $key=>$label) {
        echo '<p><label>'.esc_html($label).'<br><input style="width:100%" name="tmc_components['.esc_attr($index).']['.esc_attr($key).']" value="'.esc_attr($component[$key] ?? '').'"></label></p>';
    }
    echo '<input type="hidden" name="tmc_components['.esc_attr($index).'][sourceRow]" value="'.esc_attr($component['sourceRow'] ?? '').'">';
    echo '<label><input type="checkbox" name="tmc_components['.esc_attr($index).'][remove]" value="1"> Remove this component when saving</label></fieldset>';
}

function tmc_portal_save($post_id) {
    if (!isset($_POST['tmc_portal_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['tmc_portal_nonce'])), 'tmc_portal_save')) { return; }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) { return; }
    if (!current_user_can('edit_post', $post_id)) { return; }
    $type = get_post_type($post_id);
    if (!in_array($type, array('tmc_project','tmc_publication','tmc_news'), true)) { return; }
    $record = get_post_meta($post_id, '_tmc_record', true);
    $record = is_array($record) ? $record : array();
    $input = isset($_POST['tmc_record']) && is_array($_POST['tmc_record']) ? wp_unslash($_POST['tmc_record']) : array();
    foreach (tmc_portal_fields($type) as $key=>$label) {
        $value = isset($input[$key]) && is_scalar($input[$key]) ? (string)$input[$key] : '';
        if ($key === 'year') { $record[$key] = absint($value); }
        elseif (in_array($key, array('url','referenceUrl'), true)) { $record[$key] = esc_url_raw($value, array('http','https')); }
        elseif ($key === 'citationNoteEn' || $key === 'citationNoteBm') { $record['citationNote'][$key === 'citationNoteEn' ? 'en' : 'bm'] = sanitize_textarea_field($value); }
        else { $record[$key] = sanitize_textarea_field($value); }
    }
    if ($type === 'tmc_project') {
        $components = array();
        foreach (isset($_POST['tmc_components']) && is_array($_POST['tmc_components']) ? wp_unslash($_POST['tmc_components']) : array() as $index=>$component) {
            if (!is_array($component) || !empty($component['remove']) || empty($component['title'])) { continue; }
            $clean = array();
            foreach (array('title','description','duration','targetedParticipants','funding') as $key) {
                $clean[$key] = sanitize_textarea_field(isset($component[$key]) && is_scalar($component[$key]) ? (string)$component[$key] : '');
            }
            $clean['sourceRow'] = absint($component['sourceRow'] ?? 0) ?: ($post_id * 1000 + absint($index));
            $components[] = $clean;
        }
        $record['subProjects'] = $components;
    }
    // Keep private operational data out of the portal record.
    unset($record['currentParticipants'], $record['samplesCount']);
    update_post_meta($post_id, '_tmc_record', $record);
}
add_action('save_post', 'tmc_portal_save');

function tmc_portal_enable_managed($new_status, $old_status, $post) {
    if ($new_status === 'publish' && in_array($post->post_type, array('tmc_project','tmc_publication'), true)) {
        update_option('tmc_portal_managed', true, false);
    }
}
add_action('transition_post_status', 'tmc_portal_enable_managed', 10, 3);

function tmc_portal_snapshot($type) {
    $records = array();
    foreach (get_posts(array('post_type'=>$type, 'post_status'=>'publish', 'numberposts'=>-1, 'orderby'=>'menu_order date', 'order'=>'ASC')) as $post) {
        $record = get_post_meta($post->ID, '_tmc_record', true);
        $record = is_array($record) ? $record : array();
        $record['id'] = get_post_meta($post->ID, '_tmc_source_id', true) ?: 'wp-'.$post->ID;
        $record['title'] = get_the_title($post);
        $record['description'] = wp_strip_all_tags($post->post_content);
        if ($type === 'tmc_project') {
            $defaults = array('sourceRow'=>$post->ID, 'category'=>'Cohort Infrastructure', 'status'=>'Active', 'targetedParticipants'=>'Not listed', 'currentParticipants'=>'Awaiting publication approval', 'samplesCount'=>'Awaiting publication approval', 'duration'=>'Not listed','collaborators'=>'Not listed','funding'=>'Not listed','participantDataSource'=>'Not listed');
            $record = array_merge($defaults, $record);
            $record['currentParticipants'] = 'Awaiting publication approval';
            $record['samplesCount'] = 'Awaiting publication approval';
        } elseif ($type === 'tmc_publication') {
            $record = array_merge(array('year'=>0,'journal'=>'','authors'=>'','doi'=>'','url'=>'','category'=>'','publicationStatus'=>'','articleType'=>'','plainLanguageSummary'=>'','abstract'=>'','fullPdfSize'=>''),$record);
        } else {
            $record['body'] = wp_strip_all_tags($post->post_content);
            $record['tag'] = $record['tag'] ?? 'Research';
            $record['date'] = $record['date'] ?? get_the_date('j M Y', $post);
            $record['snippet'] = $record['snippet'] ?? wp_trim_words($record['body'], 30);
            $record['tagBg'] = 'bg-blue-100'; $record['tagColor'] = 'text-ukm-navy';
        }
        $records[] = $record;
    }
    return $records;
}

function tmc_portal_page_templates($templates) {
    $templates['tmc-research-portal.php'] = 'TMC Research Portal';
    return $templates;
}
add_filter('theme_page_templates', 'tmc_portal_page_templates');
function tmc_portal_template($template) {
    if (is_page() && get_page_template_slug() === 'tmc-research-portal.php') { return TMC_PORTAL_DIR.'portal-template.php'; }
    return $template;
}
add_filter('template_include', 'tmc_portal_template');

function tmc_portal_import_menu() {
    add_management_page('TMC Research Import','TMC Research Import','manage_options','tmc-research-import','tmc_portal_import_page');
}
add_action('admin_menu','tmc_portal_import_menu');
function tmc_portal_import_page() {
    if (!current_user_can('manage_options')) { return; }
    echo '<div class="wrap"><h1>TMC Research Portal</h1><p>Import the prepared snapshot as drafts. Existing UKM content is not replaced. Review and publish approved records using TMC Projects and TMC Publications. Create a Page using the TMC Research Portal template to preview the application.</p>';
    if (isset($_POST['tmc_import'])) {
        check_admin_referer('tmc_portal_import');
        $count = tmc_portal_seed();
        echo '<div class="notice notice-success"><p>'.esc_html($count).' draft records imported. Existing records were skipped.</p></div>';
    }
    echo '<form method="post">'; wp_nonce_field('tmc_portal_import');
    submit_button('Import snapshot as drafts', 'primary', 'tmc_import'); echo '</form></div>';
}
function tmc_portal_seed() {
    $seed = json_decode(file_get_contents(TMC_PORTAL_DIR.'seed.json'), true);
    if (!is_array($seed)) { return 0; }
    $count = 0;
    foreach (array('projects'=>'tmc_project','publications'=>'tmc_publication') as $key=>$type) {
        foreach ($seed[$key] ?? array() as $index=>$record) {
            $existing = get_posts(array('post_type'=>$type,'post_status'=>'any','numberposts'=>1,'meta_key'=>'_tmc_source_id','meta_value'=>$record['id']));
            if ($existing) { continue; }
            $post_id = wp_insert_post(array('post_type'=>$type,'post_status'=>'draft','post_title'=>$record['title'],'post_content'=>$record['description'] ?? '', 'menu_order'=>$index), true);
            if (is_wp_error($post_id)) { continue; }
            unset($record['currentParticipants'], $record['samplesCount']);
            update_post_meta($post_id,'_tmc_record',$record);
            update_post_meta($post_id,'_tmc_source_id',$record['id']);
            $count++;
        }
    }
    return $count;
}

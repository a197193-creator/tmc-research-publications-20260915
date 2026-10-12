<?php
if (!defined('ABSPATH')) { exit; }
$manifest_path = TMC_PORTAL_DIR.'build/.vite/manifest.json';
$manifest = file_exists($manifest_path) ? json_decode(file_get_contents($manifest_path), true) : array();
$entry = $manifest['index.html'] ?? null;
if (!$entry) { wp_die('The TMC portal build is missing. Install the complete tested ZIP.'); }
$config = array('assetBase'=>TMC_PORTAL_URL.'build/','portalUrl'=>get_permalink(),'news'=>tmc_portal_snapshot('tmc_news'));
// A newly installed package shows the reviewed static snapshot until approved
// records are published. Managed mode is explicit and can render an empty index.
$managed = get_option('tmc_portal_managed', false);
foreach (array('projects'=>'tmc_project','publications'=>'tmc_publication') as $key=>$type) {
    $records = tmc_portal_snapshot($type);
    if ($records || $managed) { $config[$key] = $records; }
}
foreach ($entry['css'] ?? array() as $index=>$css) {
    wp_enqueue_style('tmc-portal-'.$index, TMC_PORTAL_URL.'build/'.$css, array(), '1.0.0');
}
wp_enqueue_style('tmc-portal-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Slab:wght@400;500;600;700&family=Roboto:wght@300;400;500;600;700&family=Public+Sans:wght@400;500;600;700&display=swap', array(), null);
wp_enqueue_style('tmc-portal-icons', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', array(), null);
?>
<!doctype html><html <?php language_attributes(); ?>><head>
<meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width,initial-scale=1">
<title><?php echo esc_html(get_the_title().' | TMC Research & Publications'); ?></title>
<link rel="icon" href="<?php echo esc_url(TMC_PORTAL_URL.'build/favicon.svg'); ?>">
<?php wp_head(); ?></head><body <?php body_class('tmc-research-portal'); ?>>
<?php wp_body_open(); ?><div id="root"></div>
<noscript><p>JavaScript is required to browse the interactive research portal. <a href="https://www.ukm.my/mycohort/ms/penyelidikan-kami/">Open UKM research information</a>.</p></noscript>
<script>window.TmcPortal=<?php echo wp_json_encode($config, JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT); ?>;</script>
<script type="module" src="<?php echo esc_url(TMC_PORTAL_URL.'build/'.$entry['file']); ?>"></script>
<?php wp_footer(); ?></body></html>

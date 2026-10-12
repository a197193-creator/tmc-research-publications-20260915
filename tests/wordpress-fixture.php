<?php
require '/wordpress/wp-load.php';
wp_set_current_user(1);
tmc_portal_types();
function tmc_assert($condition,$message) { if (!$condition) { throw new Exception($message); } }
$imported=tmc_portal_seed();
tmc_assert($imported===90,'Expected 90 draft imports');
tmc_assert(tmc_portal_seed()===0,'Repeated import must not duplicate records');
tmc_assert(count(tmc_portal_snapshot('tmc_project'))===0,'Draft projects must stay unpublished');
foreach(get_posts(array('post_type'=>array('tmc_project','tmc_publication'),'post_status'=>'draft','numberposts'=>-1)) as $post) {
    wp_update_post(array('ID'=>$post->ID,'post_status'=>'publish'));
}
$projects=tmc_portal_snapshot('tmc_project');
$publications=tmc_portal_snapshot('tmc_publication');
tmc_assert(count($projects)===22 && count($publications)===68,'Published snapshot counts incorrect');
tmc_assert($projects[1]['targetedParticipants']==='8,000','MySerobiome target mismatch');
tmc_assert($projects[0]['currentParticipants']==='Awaiting publication approval','Operational count exposure');
$project=get_posts(array('post_type'=>'tmc_project','post_status'=>'publish','numberposts'=>1))[0];
$old_title=$project->post_title;
wp_update_post(array('ID'=>$project->ID,'post_title'=>'Local CMS edit proof'));
tmc_assert(in_array('Local CMS edit proof',array_column(tmc_portal_snapshot('tmc_project'),'title'),true),'CMS edit did not reach frontend snapshot');
wp_update_post(array('ID'=>$project->ID,'post_title'=>$old_title));
$_POST=array('tmc_portal_nonce'=>'invalid','tmc_record'=>array('targetedParticipants'=>'999'));
$before=get_post_meta($project->ID,'_tmc_record',true);
tmc_portal_save($project->ID);
tmc_assert(get_post_meta($project->ID,'_tmc_record',true)===$before,'Invalid nonce must not change content');
$_POST=array();
$page=wp_insert_post(array('post_type'=>'page','post_status'=>'publish','post_title'=>'TMC Research Portal','post_name'=>'research-portal'));
update_post_meta($page,'_wp_page_template','tmc-research-portal.php');
update_option('show_on_front','page'); update_option('page_on_front',$page);
$result=array('result'=>'passed','WordPressVersion'=>get_bloginfo('version'),'phpVersion'=>PHP_VERSION,'draftImport'=>90,'repeatImport'=>0,'publishedProjects'=>22,'publishedPublications'=>68,'sourceTargets'=>'passed','cmsEdit'=>'passed','nonceGuard'=>'passed','currentCountsWithheld'=>'passed');
file_put_contents('/wordpress/wp-content/plugins/tmc-research-portal/fixture-result.json',wp_json_encode($result,JSON_PRETTY_PRINT));
echo wp_json_encode($result);

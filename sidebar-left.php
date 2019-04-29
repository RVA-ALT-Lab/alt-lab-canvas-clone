<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package understrap
 */

// if ( ! is_active_sidebar( 'left-sidebar' ) ) {
// 	return;
// }

// when both sidebars turned on reduce col size to 3 from 4.
$sidebar_pos = get_theme_mod( 'understrap_sidebar_position' );
?>

<?php if ( 'both' === $sidebar_pos ) : ?>
<div class="col-md-3 widget-area" id="left-sidebar" role="complementary">
	<?php else : ?>
<div class="col-md-3 widget-area" id="left-sidebar" role="complementary"> <!--was col-md-4-->
	<?php endif; ?>
<?php 
if (is_active_sidebar('left-sidebar' ))	{
	  dynamic_sidebar( 'left-sidebar' ); 
	} else {
	   if ( current_user_can('editor') || current_user_can('administrator') ){
	   	 echo '<div class="alert alert-info" role="alert">Put a Menu in the left sidebar as a widget to further customize.</div>';
	   }
	  echo '<ul>';
	  $args = array(
        'depth'        => 0,
         'title_li'     => '',
    );
      wp_list_pages($args);
	  echo '</ul>';	
	}
?>

</div><!-- #secondary -->

<?php
/**
 * Partial template for content in page.php
 *
 * @package understrap
 */

?>
<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<header class="entry-header">

		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

	</header><!-- .entry-header -->

	<div class="entry-content">

		<?php the_content(); ?>

		<?php
		wp_link_pages( array(
			'before' => '<div class="page-links">' . __( 'Pages:', 'understrap' ),
			'after'  => '</div>',
		) );
		?>

	</div><!-- .entry-content -->
	 <div id="sub-nav-footer"><!--page navigation holder for prev/next nav-->
		    <a href="" id="prev-btn" class="sub-nav-btn"><span class="fa fa-caret-left"></span> Previous</a>
		    <a href="" id="next-btn" class="sub-nav-btn">Next <span class="fa fa-caret-right"></span></a>
     </div>

	<footer class="entry-footer">

		<?php //edit_post_link( __( 'Edit', 'understrap' ), '<span class="edit-link">', '</span>' ); ?>

	</footer><!-- .entry-footer -->

</article><!-- #post-## -->

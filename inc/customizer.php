<?php
/**
 * Understrap Theme Customizer
 *
 * @package understrap
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
if ( ! function_exists( 'understrap_customize_register' ) ) {
	/**
	 * Register basic customizer support.
	 *
	 * @param object $wp_customize Customizer reference.
	 */
	function understrap_customize_register( $wp_customize ) {
		$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
		$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
		$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
	}
}
add_action( 'customize_register', 'understrap_customize_register' );

if ( ! function_exists( 'understrap_theme_customize_register' ) ) {
	/**
	 * Register individual settings through customizer's API.
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer reference.
	 */
	function understrap_theme_customize_register( $wp_customize ) {

		// Theme layout settings.
		$wp_customize->add_section( 'understrap_theme_layout_options', array(
			'title'       => __( 'Theme Layout Settings', 'understrap' ),
			'capability'  => 'edit_theme_options',
			'description' => __( 'Container width and sidebar defaults', 'understrap' ),
			'priority'    => 160,
		) );

		 //select sanitization function
        function understrap_theme_slug_sanitize_select( $input, $setting ){
         
            //input must be a slug: lowercase alphanumeric characters, dashes and underscores are allowed only
            $input = sanitize_key($input);
 
            //get the list of possible select options 
            $choices = $setting->manager->get_control( $setting->id )->choices;
                             
            //return input if valid or return default option
            return ( array_key_exists( $input, $choices ) ? $input : $setting->default );                
             
        }

		// $wp_customize->add_setting( 'understrap_container_type', array(
		// 	'default'           => 'container',
		// 	'type'              => 'theme_mod',
		// 	'sanitize_callback' => 'understrap_theme_slug_sanitize_select',
		// 	'capability'        => 'edit_theme_options',
		// ) );

		// $wp_customize->add_control(
		// 	new WP_Customize_Control(
		// 		$wp_customize,
		// 		'understrap_container_type', array(
		// 			'label'       => __( 'Container Width', 'understrap' ),
		// 			'description' => __( "Choose between Bootstrap's container and container-fluid", 'understrap' ),
		// 			'section'     => 'understrap_theme_layout_options',
		// 			'settings'    => 'understrap_container_type',
		// 			'type'        => 'select',
		// 			'choices'     => array(
		// 				'container'       => __( 'Fixed width container', 'understrap' ),
		// 				'container-fluid' => __( 'Full width container', 'understrap' ),
		// 			),
		// 			'priority'    => '10',
		// 		)
		// 	) );

			//add custom logo
		$wp_customize->add_setting( 'logo_in_header_menu', array(
			'default'           => 'none',
			'type'              => 'theme_mod',
			'sanitize_callback' => 'sanitize_text_field',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'logo_in_header_menu', array(
					'label'       => __( 'Logo', 'understrap' ),
					'description' => __( "Set a custom logo in the header menu",
					'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'settings'    => 'logo_in_header_menu',
					'type'        => 'select',
					'sanitize_callback' => 'understrap_theme_slug_sanitize_select',
					'choices'     => array(
						'altlab-menu-logo' => __( 'ALT Lab logo', 'understrap' ),
						'none'  => __( 'No logo', 'understrap' ),
					),
					'priority'    => '20',
				)
			) );

			//add custom background
		$wp_customize->add_setting( 'body_background_choice', array(
			'default'           => 'none',
			'type'              => 'theme_mod',
			'sanitize_callback' => 'understrap_theme_slug_sanitize_select',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'body_background_choice', array(
					'label'       => __( 'Body Background', 'understrap' ),
					'description' => __( "Choose your body background option", 'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'settings'    => 'body_background_choice',
					'type'        => 'select',
					'choices'     => array(
						'altlab-edgebars'       => __( 'ALT Lab yellow sidebars', 'understrap' ),
						'none' => __( 'No background', 'understrap' ),
					),
					'priority'    => '10',
				)
			) );
	}
} // endif function_exists( 'understrap_theme_customize_register' ).
add_action( 'customize_register', 'understrap_theme_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
if ( ! function_exists( 'understrap_customize_preview_js' ) ) {
	/**
	 * Setup JS integration for live previewing.
	 */
	function understrap_customize_preview_js() {
		wp_enqueue_script( 'understrap_customizer', get_template_directory_uri() . '/js/customizer.js',
			array( 'customize-preview' ), '20130508', true );
	}
}
add_action( 'customize_preview_init', 'understrap_customize_preview_js' );

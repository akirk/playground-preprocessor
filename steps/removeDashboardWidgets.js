customSteps.removeDashboardWidgets = function( step ) {
    var steps = [
        {
            "step": "mkdir",
            "path": "wordpress/wp-content/mu-plugins",
        },
        {
            "step": "writeFile",
            "path": "wordpress/wp-content/mu-plugins/remove-dashboard-widgets.php",
            "data": `<?php
add_action(
	'do_meta_boxes',
	static function ( $screen_id ) {
		global $wp_meta_boxes;

		if ( 'dashboard' !== $screen_id ) {
			return;
		}

		// Remove Welcome panel.
		remove_action( 'welcome_panel', 'wp_welcome_panel' );

		// Remove default widgets that are not very helpful.
		$default_widgets = array(
			'dashboard_right_now'         => 'normal',
			'network_dashboard_right_now' => 'normal',
			'dashboard_activity'          => 'normal',
			'dashboard_quick_press'       => 'side',
			'dashboard_primary'           => 'side',
		);
		foreach ( $default_widgets as $widget_id => $context ) {
			remove_meta_box( $widget_id, $screen_id, $context );
		}

		// Remove Site Health unless there are critical issues or recommendations.
		if ( isset( $wp_meta_boxes[ $screen_id ]['normal']['core']['dashboard_site_health'] ) ) {
			$get_issues = get_transient( 'health-check-site-status-result' );
			if ( false === $get_issues ) {
				remove_meta_box( 'dashboard_site_health', $screen_id, 'normal' );
			} else {
				$issue_counts = json_decode( $get_issues, true );
				if ( empty( $issue_counts['critical'] ) && empty( $issue_counts['recommended'] ) ) {
					remove_meta_box( 'dashboard_site_health', $screen_id, 'normal' );
				}
			}
		}

	}
);
`
	}
	];
	return steps;
};
customSteps.removeDashboardWidgets.info = "Remove any dashboard widgets.";

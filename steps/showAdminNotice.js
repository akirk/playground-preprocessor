customSteps.showAdminNotice = function( step ) {
    var steps = [
        {
            "step": "mkdir",
            "path": "wordpress/wp-content/mu-plugins",
        },
        {
            "step": "writeFile",
            "path": "wordpress/wp-content/mu-plugins/show-admin-notice.php",
            "data": `<?php
add_action(
    'admin_notices',
    function() {
        echo '<div class="notice notice-success is-dismissible"><p>${step?.vars?.text}</p></div>';
    }
);
`
        }
    ];
    steps.landingPage = '/wp-admin/';
    steps.login = true;
    return steps;
}
customSteps.showAdminNotice.vars = [
    {
        "name": "text",
        "description": "The notice to be displayed",
        "required": true,
        "samples": [ "Welcome to WordPress Playground!", "This is a demo of the Step Library" ]
    }
];

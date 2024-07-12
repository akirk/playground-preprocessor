customSteps.disableLegacyCss = function() {
    var steps = [
    {
        "step": "mkdir",
        "path": "wordpress/wp-content/mu-plugins/felixarntz-mu-plugins",
        "dedup": true
    },
    {
        "step": "unzip",
        "zipFile": {
            "resource": "url",
            "url": "https://raw.githubusercontent.com/akirk/playground-step-library/main/felixarntz-mu-plugins-shared.zip"
        },
        "extractToPath": "/wordpress/wp-content/mu-plugins",
        "dedup": true
    },
    {
        "step": "writeFile",
        "path": "wordpress/wp-content/mu-plugins/felixarntz-mu-plugins/disable-legacy-css.php",
        "data": "<?php\n/**\n * Plugin Name: Disable Legacy CSS\n * Plugin URI: https://github.com/felixarntz/felixarntz-mu-plugins\n * Description: Removes legacy CSS from certain widgets and shortcodes from wp_head output.\n * Author: Felix Arntz\n * Author URI: https://felix-arntz.me\n * License: GPLv2 or later\n * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html\n * Text Domain: felixarntz-mu-plugins\n *\n * @package felixarntz-mu-plugins\n */\n\nnamespace Felix_Arntz\\MU_Plugins;\n\nif ( ! defined( 'ABSPATH' ) ) {\n\texit; // Exit if accessed directly.\n}\n\nadd_filter( 'show_recent_comments_widget_style', '__return_false' );\nadd_filter( 'use_default_gallery_style', '__return_false' );\n"
    }
];
    return steps;
}
customSteps.disableLegacyCss.felixArntzMuPlugins = true;
customSteps.disableLegacyCss.info = "Removes legacy CSS from certain widgets and shortcodes from wp_head output.";

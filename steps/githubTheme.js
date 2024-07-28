customSteps.githubTheme = function( step ) {
	const repoTest = /(?:https:\/\/github.com\/)?([^\/]+)\/([^\/]+)/.exec( step.vars.repo );
	if ( ! repoTest ) {
		return [];
	}
	const repo = repoTest[1] + "/" + repoTest[2];
	const branch = step.vars.branch || "main";
	const options = {
		activate: true,
	};

	const outStep = {
		"step": "installTheme",
		"themeZipFile": {
			"resource": "url",
			"url": `https://github-proxy.com/proxy/?repo=${repo}&branch=${branch}`
		},
		options
	};
	if ( step.vars.prs ) {
		outStep.queryParams = {
			'gh-ensure-auth': 'yes',
			'ghexport-repo-url': 'https://github.com/' + repo,
			'ghexport-content-type': 'theme',
			'ghexport-theme': repoTest[2],
			'ghexport-playground-root': '/wordpress/wp-content/themes/' + repoTest[2],
			'ghexport-pr-action': 'create',
			'ghexport-allow-include-zip': 'no',
		};
	}

	return [ outStep ];
};
customSteps.githubTheme.info = "Install a theme from a Githun repository.";
customSteps.githubTheme.vars = [
	{
		"name": "repo",
		"description": "The theme resides in this GitHub repository.",
		"samples": [ "richtabor/kanso", "ndiego/nautilus" ]
	},
	{
		"name": "branch",
		"description": "Which branch to use.",
		"samples": [ "main" ]
	},
	{
		"name": "prs",
		"description": "Add support for submitting Github Requests.",
		"type": "boolean",
		"samples": [ "false", "true" ]
	}
];
const path = require('path');
const { runNode } = require('./lib/node');
const {
	repoRoot,
	webpackConfigPath,
	srcPath,
	listDirs,
	exists
} = require('./util');

/**
 * @param {string} configPath
 * @param {WebpackOptions} options
 */
function runWebpack(configPath, options) {
	const extraArgs = [];
	if (options.watch) {
		extraArgs.push('--watch');
	}

	if (options.preact) {
		extraArgs.push('--preact', path.resolve(process.cwd(), options.preact));
	}

	return runNode(
		repoRoot('./node_modules/webpack/bin/webpack.js'),
		['--config', configPath, '--mode', options.mode, ...extraArgs],
		options
	);
}

/**
 * @returns {Promise<string[]>}
 */
async function getAvailableBundles() {
	const srcDirs = await listDirs(srcPath());
	const possibleBundles = await Promise.all(
		srcDirs.map(async srcDir =>
			(await exists(webpackConfigPath(srcDir))) ? srcDir : null
		)
	);

	return possibleBundles.filter(Boolean);
}

/**
 * @param {string[]} bundles Bundles such as "direct", "full-compat" etc.
 * @return {Promise<Record<string, string>>} Map of framework name to bundle name
 * e.g. { "preact-router": "direct" }
 */
async function getAvailableLibraries(bundles) {
	const librariesByBundle = await Promise.all(
		bundles.map(bundle => {
			return listDirs(srcPath(bundle));
		})
	);

	/** @type {Record<string, string>} */
	const frameworkPaths = {};
	for (let i = 0; i < bundles.length; i++) {
		let bundle = bundles[i];
		for (let framework of librariesByBundle[i]) {
			frameworkPaths[framework] = bundle;
		}
	}

	return frameworkPaths;
}

/** @type {Readonly<WebpackOptions>} */
const defaultBuildOptions = Object.freeze({
	debug: false,
	watch: false,
	mode: 'production',
	cwd: repoRoot()
});

/**
 * @typedef {"development" | "production"} BuildMode
 * @typedef {{ debug?: boolean; watch?: boolean; mode?: BuildMode, cwd?: string; preact?: string }} WebpackOptions
 * @param {string[]} buildRequests
 * @param {WebpackOptions} [options]
 * @returns {Promise<Array<() => void>>}
 */
async function getWebpackTasks(buildRequests, options = {}) {
	options = {
		...defaultBuildOptions,
		...options
	};

	const availableBundles = await getAvailableBundles();
	const availableLibraries = await getAvailableLibraries(availableBundles);

	buildRequests = buildRequests.length == 0 ? availableBundles : buildRequests;

	/** @type {Array<() => void>} */
	const tasks = [];
	for (let buildRequest of buildRequests) {
		if (availableBundles.includes(buildRequest)) {
			tasks.push(() => runWebpack(webpackConfigPath(buildRequest), options));
		} else if (buildRequest in availableLibraries) {
			tasks.push(() =>
				runWebpack(webpackConfigPath(availableLibraries[buildRequest]), options)
			);
		} else {
			throw new Error(`"${buildRequest}" does not exist.`);
		}
	}

	return tasks;
}

/**
 * @param {string[]} buildRequests
 * @param {WebpackOptions} options
 */
async function build(buildRequests, options) {
	const tasks = await getWebpackTasks(buildRequests, options);
	tasks.forEach(task => task());
}

module.exports = {
	build,
	getWebpackTasks,
	getAvailableBundles,
	getAvailableLibraries
};

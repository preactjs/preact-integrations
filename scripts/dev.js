const { getWebpackTasks } = require("./build");
const { runDevServer } = require("./serve");

/**
 * @param {string[]} buildRequests
 * @param {import('./build').WebpackOptions} options
 */
async function dev(buildRequests, options) {
	options.watch = true;

	const tasks = [
		...(await getWebpackTasks(buildRequests, options)),
		() => runDevServer(options)
	];

	tasks.forEach(task => task());
}

module.exports = {
	dev
};

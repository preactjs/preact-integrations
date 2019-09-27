const { repoRoot } = require("../util");
const { runNode } = require("./node");

/**
 * @param {import('./node').NodeOptions} options
 */
function runDevServer(options) {
	return runNode(
		repoRoot("node_modules/serve/bin/serve.js"),
		[repoRoot()],
		options
	);
}

module.exports = {
	runDevServer
};

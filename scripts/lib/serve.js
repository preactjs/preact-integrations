const open = require("open");
const { repoRoot, outputFolder } = require("../util");
const { runNode } = require("./node");

/**
 * @param {import('./node').NodeOptions} options
 */
function runDevServer(options) {
	const childProcess = runNode(
		repoRoot("node_modules/serve/bin/serve.js"),
		[repoRoot()],
		options
	);

	open(`http://localhost:5000/${outputFolder}`);

	return childProcess;
}

module.exports = {
	runDevServer
};

const {
	runDevServer,
	exitDevServer,
	ensureDevServerRunning
} = require("./serve");
const { repoRoot } = require("./util");
const { runNode, toCompletion } = require("./lib/node");

const jestPath = repoRoot("./node_modules/jest/bin/jest.js");

/**
 * @param {string[]} libraries
 */
async function test(libraries) {
	const devServerProcess = runDevServer();

	try {
		console.log("Waiting for dev server to start...");
		await ensureDevServerRunning({ verbose: true });
	} finally {
		console.log("Finished waiting for dev server to start.");
	}

	try {
		await toCompletion(runNode(jestPath, libraries));
	} finally {
		try {
			await exitDevServer(devServerProcess);
		} catch (e) {
			console.error("Dev server did not exit cleanly:" + e);
		}
	}
}

module.exports = {
	test
};

const { repoRoot } = require("./util");
const { get } = require("./lib/request");
const { runNode, toCompletion } = require("./lib/node");

const port = 5000;
const devHost = `http://localhost:${port}`;

/**
 * @param {import('./lib/node').NodeOptions} [options]
 */
function runDevServer(options) {
	return runNode(
		repoRoot("node_modules/serve/bin/serve.js"),
		[repoRoot(), "-l", port.toString()],
		options
	);
}

/**
 * @param {import('child_process').ChildProcess} childProcess
 * @returns {Promise<void>}
 */
function exitDevServer(childProcess) {
	const promise = toCompletion(childProcess);
	childProcess.kill();
	return promise;
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @typedef {{ maxRetryCount?: number; minRetryDelayMs?: number; verbose?: boolean; }} EnsureOptions
 * @param {EnsureOptions} [options]
 * @param {number} [retryCount = 0]
 */
async function ensureDevServerRunning(
	{ maxRetryCount = 3, minRetryDelayMs = 500, verbose = false } = {},
	retryCount = 0
) {
	let lastRequestStartTime;
	while (retryCount < maxRetryCount) {
		try {
			if (verbose) {
				console.log(
					`Attempting to connect to ${devHost}. retryCount: ${retryCount}`
				);
			}

			lastRequestStartTime = Date.now();
			return await get(devHost);
		} catch (e) {
			let timeElasped = Date.now() - lastRequestStartTime;
			if (timeElasped < minRetryDelayMs) {
				await delay(minRetryDelayMs - timeElasped);
			}

			retryCount += 1;
		}
	}

	throw new Error(`Could not connect to dev server: max retries reached.`);
}

module.exports = {
	port,
	host: devHost,
	runDevServer,
	exitDevServer,
	ensureDevServerRunning
};

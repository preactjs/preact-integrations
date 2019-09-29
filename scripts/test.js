const {
	runDevServer,
	exitDevServer,
	ensureDevServerRunning
} = require("./lib/serve");
const { toCompletion } = require("./lib/node");
const { runJest } = require("./lib/jest");

async function main() {
	const devServerProcess = runDevServer();

	try {
		console.log("Waiting for dev server to start...");
		await ensureDevServerRunning({ verbose: true });
	} finally {
		console.log("Finished waiting for dev server to start.");
	}

	try {
		await toCompletion(runJest(process.argv.slice(2)));
	} finally {
		try {
			await exitDevServer(devServerProcess);
		} catch (e) {
			console.error("Dev server did not exit cleanly:" + e);
		}
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});

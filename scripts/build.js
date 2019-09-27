const mri = require("mri");
const { getWebpackTasks } = require("./lib/webpack");

// TODO: Uncomment if needed
// https://github.com/mysticatea/npm-run-all/issues/105
// https://git.io/fjKbw
// Avoid MaxListenersExceededWarnings.
// process.stdout.setMaxListeners(0);
// process.stderr.setMaxListeners(0);

async function main() {
	const args = mri(process.argv);
	let buildRequests = args._.slice(2); // First 2 args are ["node.exe" "./scripts/build.js"]

	/** @type {import('./lib/webpack').WebpackOptions} */
	const options = {};
	if ("debug" in args) {
		options.debug = args.debug;
	}

	if ("mode" in args) {
		options.mode = args.mode;
	}

	if ("watch" in args) {
		options.watch = args.watch;
	}

	const tasks = await getWebpackTasks(buildRequests, options);
	tasks.forEach(task => task());
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});

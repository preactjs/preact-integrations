const { spawn } = require("child_process");

/**
 * @typedef {{ debug?: boolean; cwd?: string; }} NodeOptions
 * @param {string} path
 * @param {string[]} args
 * @param {NodeOptions} options
 */
function runNode(path, args, options) {
	args.unshift(path);
	if (options.debug) {
		console.log("$", process.execPath, args.join(" "));
	}
	return spawn(process.execPath, args, {
		stdio: "inherit",
		cwd: options.cwd
	});
}

module.exports = {
	runNode
};

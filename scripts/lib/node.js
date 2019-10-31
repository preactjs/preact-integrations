const { spawn } = require('child_process');
const { repoRoot } = require('../../scripts/util');

/**
 * @typedef {{ debug?: boolean; cwd?: string; }} NodeOptions
 * @param {string} path
 * @param {string[]} args
 * @param {NodeOptions} [options]
 */
function runNode(path, args, options = {}) {
	args.unshift(path);
	if (options.debug) {
		console.log('$', process.execPath, args.join(' '));
	}
	return spawn(process.execPath, args, {
		stdio: 'inherit',
		cwd: options.cwd || repoRoot()
	});
}

/**
 * @param {import('child_process').ChildProcess} childProcess
 * @returns {Promise<void>}
 */
function toCompletion(childProcess) {
	return new Promise((resolve, reject) => {
		childProcess.on('error', reject);
		childProcess.on('exit', (code, signal) => {
			if (code > 0) {
				const error = new Error(
					`Child process exited with non-success code: ${code}`
				);
				error.signal = signal;

				reject(error);
			} else {
				resolve();
			}
		});
	});
}

module.exports = {
	runNode,
	toCompletion
};

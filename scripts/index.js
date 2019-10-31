const { readFile } = require('fs').promises;
const sade = require('sade');
const { toCompletion } = require('./lib/node');
const { repoRoot } = require('./util');
const { build } = require('./build');
const { dev } = require('./dev');
const { runDevServer } = require('./serve');

// TODO: Uncomment if needed
// https://github.com/mysticatea/npm-run-all/issues/105
// https://git.io/fjKbw
// Avoid MaxListenersExceededWarnings.
// process.stdout.setMaxListeners(0);
// process.stderr.setMaxListeners(0);

/** @type {Array<import('./build').BuildMode>} */
const modes = ['production', 'development'];

/**
 * @typedef {{ _: string[]; debug: boolean; mode: import('./build').BuildMode; watch: boolean; }} CmdLineOptions
 * @param {(libraries: string[], options: any) => Promise<any>} cmd
 * @returns {(lib1: string, opts: CmdLineOptions) => Promise<any>}
 */
const run = cmd => async (lib1, opts) => {
	if ('mode' in opts && modes.indexOf(opts.mode) == -1) {
		throw new Error(`Invalid mode given: "${opts.mode}"`);
	}

	if (lib1) {
		opts._.unshift(lib1);
	}

	return cmd(opts._, opts);
};

async function main() {
	const version = JSON.parse(await readFile(repoRoot('package.json'), 'utf8'))
		.version;

	const prog = sade('scripts');
	prog.version(version).option('--debug', 'Print out debugging info', false);

	prog
		.command('build [libraries]')
		.describe(
			'Build the bundles that include the libraries passed in (defaults to building all)'
		)
		.option('--mode, -m', "'production' or 'development'", 'production')
		.option('--watch, -w', 'Watch source files and rebuild on change', false)
		.action(run(build));

	prog
		.command('dev [libraries]')
		.option('--mode, -m', "'production' or 'development'", 'development')
		.describe(
			'Watch src files of the passed in libraries (defaults to all), build them on change, and run a web server to serve them'
		)
		.action(run(dev));

	prog
		.command('serve')
		.describe('Run a development web server')
		.action(() => toCompletion(runDevServer()));

	return prog.parse(process.argv);
}

main().catch(error => {
	console.error(error);
	process.exit(1);
});

const path = require('path');
const { promisify } = require('util');
const { exists: existsAsync } = require('fs');
const { readdir } = require('fs').promises;

const outputFolder = 'preact-integrations';
const outputPath = (...args) => repoRoot(outputFolder, ...args);

const repoRoot = (...args) => path.join(__dirname, '..', ...args);
const srcPath = (...args) => repoRoot('src', ...args);
const webpackConfigPath = bundleName =>
	srcPath(bundleName, 'webpack.config.js');

const exists = promisify(existsAsync);

const listDirs = async source =>
	(await readdir(source, { withFileTypes: true }))
		.filter(child => child.isDirectory())
		.map(child => child.name);

const listFiles = async source =>
	(await readdir(source, { withFileTypes: true }))
		.filter(child => child.isFile())
		.map(child => child.name);

module.exports = {
	repoRoot,
	srcPath,
	listDirs,
	listFiles,
	exists,
	webpackConfigPath,
	outputFolder,
	outputPath
};

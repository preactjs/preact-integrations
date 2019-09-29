const { repoRoot } = require("../util");
const { runNode } = require("./node");

/**
 * @param {string[]} args
 */
function runJest(args) {
	return runNode(repoRoot("./node_modules/jest/bin/jest.js"), args);
}

module.exports = {
	runJest
};

const { port } = require('./scripts/serve');

module.exports = {
	launch: {
		devtools: process.env.PPTR_DEBUG === 'true'
	},
	server: {
		command: 'node ./scripts serve',
		port,
		launchTimeout: 10000
	}
};

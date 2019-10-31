const { getConfig } = require('../webpackConfigHelpers');
module.exports = getConfig('full-compat', 'Full Compat', {
	alias: {
		react: 'preact/compat',
		'react-dom/test-utils': 'preact/test-utils',
		'react-dom': 'preact/compat'
	}
});

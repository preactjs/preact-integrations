module.exports = function(api) {
	api.cache(true);

	const presets = [
		[
			"@babel/preset-react",
			{
				pragma: "createElement",
				pragmaFrag: "Fragment"
			}
		]
	];

	const plugins = [
		["@babel/plugin-proposal-class-properties", { loose: true }]
	];

	return {
		presets,
		plugins
	};
};

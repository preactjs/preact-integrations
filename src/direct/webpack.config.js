const path = require("path");
const { readdirSync } = require("fs");
const { readdir } = require("fs").promises;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;

const repoRoot = (...args) => path.join(__dirname, "..", "..", ...args);
const listDirsSync = dir =>
	readdirSync(dir, { withFileTypes: true })
		.filter(f => !f.isFile())
		.map(f => f.name);

function getEntries() {
	const entries = {};
	for (let library of listDirsSync(repoRoot("./src/direct"))) {
		entries[library] = repoRoot(`./src/direct/${library}/index.js`);
	}

	return entries;
}

module.exports = {
	mode: "development",
	// entry: getEntries(),
	entry: repoRoot("./src/direct/index.js"),
	output: {
		filename: "direct.bundle.js",
		path: repoRoot("preact-integrations/direct")
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							[
								"@babel/preset-react",
								{
									pragma: "createElement",
									pragmaFrag: "Fragment"
								}
							]
						],
						plugins: [
							["@babel/plugin-proposal-class-properties", { loose: true }]
						]
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Direct - Preact Integrations",
			template: repoRoot("src/shared/template.ejs"),
			templateParameters(compilation, assets, options) {
				return {
					// Re-create default params
					compilation: compilation,
					// webpack: compilation.getStats().toJson(), // Expensive
					webpackConfig: compilation.options,
					htmlWebpackPlugin: {
						files: assets,
						options: options
					},
					// Add custom params
					libraries: listDirsSync(__dirname)
				};
			}
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			defaultSizes: "gzip",
			reportFilename: "stats/bundle-analyzer.html",
			openAnalyzer: false,
			// generateStatsFile: true,
			statsFilename: "stats/stats.js"
		})
	]
};

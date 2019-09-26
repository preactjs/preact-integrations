const path = require("path");
const { readdirSync } = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;

const repoRoot = (...args) => path.join(__dirname, "..", ...args);
const listDirsSync = dir =>
	readdirSync(dir, { withFileTypes: true })
		.filter(f => !f.isFile())
		.map(f => f.name);

const distFolder = "preact-integrations";

/**
 * @param {string} bundleName
 * @param {string} title
 * @returns {import('webpack').Configuration}
 */
function getConfig(bundleName, title) {
	const srcDir = (...args) => repoRoot("./src", bundleName, ...args);
	const distDir = (...args) => repoRoot(distFolder, bundleName, ...args);

	return {
		entry: srcDir("index.js"),
		output: {
			filename: `${bundleName}.bundle.js`,
			path: distDir()
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
				title: `${title} - Preact Integrations`,
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
						libraries: listDirsSync(srcDir())
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
}

module.exports = {
	getConfig
};

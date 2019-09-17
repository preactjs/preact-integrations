const path = require("path");
const { readdirSync } = require("fs");

const repoRoot = (...args) => path.join(__dirname, "..", "..", ...args);
const listDirsSync = dir =>
	readdirSync(dir, { withFileTypes: true }).filter(f => !f.isFile());

function getEntries() {
	const entries = {};
	for (let project of listDirsSync(repoRoot("./src/direct"))) {
		entries[project.name] = repoRoot(`./src/direct/${project.name}/index.js`);
	}

	return entries;
}

module.exports = {
	mode: "production",
	entry: getEntries(),
	output: {
		filename: "[name].bundle.js",
		path: repoRoot("dist/direct")
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
	}
};

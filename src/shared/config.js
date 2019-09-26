export const config = {
	base: "/preact-integrations",
	nav: [
		{
			path: "/",
			name: "Preact Integrations"
		},
		{
			path: "/direct",
			name: "Direct"
		},
		{
			path: "/direct-compat",
			name: "Direct Compat"
		},
		{
			path: "/full-compat",
			name: "Full Compat"
		}
	]
};

export function getUrl(url) {
	return config.base + url;
}

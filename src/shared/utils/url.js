const config = require("../config");

const libraryUrlRegex = new RegExp(
	`(${config.base}/[A-z0-9\-]+)(/[A-z0-9\-\.]+)?.*`
);

export function getUrl(url) {
	return config.base + url;
}

/**
 * @param {string[]} [libraries]
 * @param {string} [url]
 */
export function readLibraryFromUrl(libraries, url = location.href) {
	const match = url.match(libraryUrlRegex);
	if (match != null && match[2] != null) {
		let library = decodeURIComponent(match[2].slice(1));
		if (libraries != null && libraries.indexOf(library) !== -1) {
			return library;
		}
	}

	return "";
}

/**
 * @param {string} library
 * @param {string} [url]
 */
export function setLibraryInUrl(library, url = location.href) {
	let encoded = encodeURIComponent(library);
	if (encoded != "") {
		encoded += "/"
	}

	const newUrl = url.replace(libraryUrlRegex, `$1/${encoded}`);
	history.pushState({}, "", newUrl);
}

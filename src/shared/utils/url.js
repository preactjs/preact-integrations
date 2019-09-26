// TODO: Read library from path, not hash

/**
 * @param {string[]} [libraries]
 */
export function readLibraryFromUrl(libraries) {
	const library = location.hash.slice(1);
	if (libraries != null && libraries.indexOf(library) !== -1) {
		return library;
	}

	return null;
}

/**
 * @param {string} library
 */
export function setLibraryInUrl(library) {
	location.hash = library;
}

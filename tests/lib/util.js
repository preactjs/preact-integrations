import { outputFolder } from "../../scripts/util";
import { host } from "../../scripts/lib/serve";
import {
	getAvailableBundles,
	getAvailableLibraries
} from "../../scripts/lib/webpack";

let bundleCache;
let libraryCache;

async function libraryPath(library) {
	if (bundleCache == null) {
		bundleCache = await getAvailableBundles();
	}

	if (libraryCache == null) {
		libraryCache = await getAvailableLibraries(bundleCache);
	}

	if (library in libraryCache) {
		return `${libraryCache[library]}/#${library}`;
	} else {
		throw new Error(`Can't find library "${library}"`);
	}
}

export async function goToLibraryPage(library) {
	return page.goto(`${host}/${outputFolder}/${await libraryPath(library)}`, {
		waitUntil: "networkidle0"
	});
}

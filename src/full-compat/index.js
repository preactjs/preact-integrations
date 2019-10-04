import { createElement, render } from "preact";
import "preact/debug";
import { App } from "../shared/App";

/** @type {string[]} */
const libraries = window.PreactIntegrationLibraries;

function loadLibrary(library) {
	return import(`./${library}/index.js`).then(m => m.default);
}

render(
	<App libraries={libraries} loadLibrary={loadLibrary} />,
	document.getElementById("app")
);

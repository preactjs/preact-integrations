import { createElement, render, Fragment } from "preact";
import { App } from "../shared/App";

/** @type {string[]} */
const libraries = window.PreactIntegrationLibraries;

function loadLibrary(library) {
	return import(`./${library}/index.js`).then(m => m.default);
}

render(<App libraries={libraries} loadLibrary={loadLibrary} />, document.getElementById("root"));

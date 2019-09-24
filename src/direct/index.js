import { createElement, render, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";

function load(library) {
	return import(`./${library}/index.js`).then(m => m.default);
}

/** @type {string[]} */
const libraries = window.PreactIntegrationLibraries;

function Loading() {
	return <p>Loading...</p>;
}

function App() {
	const [selectedLibrary, setSelectedLibrary] = useState(libraries[0]);
	const [loading, setLoading] = useState(true);
	const [Body, setBody] = useState(null);

	useEffect(() => {
		load(selectedLibrary).then(c => {
			setLoading(false);
			setBody(() => c);
		});
	}, [selectedLibrary, setLoading, setBody]);

	function onLibraryChange(e) {
		setSelectedLibrary(e.target.value);
		setLoading(true);
	}

	return (
		<Fragment>
			<div>
				<select value={selectedLibrary} onchange={onLibraryChange}>
					{libraries.map(library => (
						<option value={library}>{library}</option>
					))}
				</select>
				{loading ? <Loading /> : <Body />}
			</div>
		</Fragment>
	);
}

render(<App />, document.getElementById("root"));

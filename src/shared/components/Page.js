import { Fragment, createElement } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Loading } from "./Loading";
import { setLibraryInUrl } from "../utils/url";

/**
 * @typedef {(library: string) => Promise<import('preact').AnyComponent>} LibraryLoader
 * @typedef {{ libraries: string[]; loadLibrary: LibraryLoader; initialLibrary?: string | null; }} PageProps
 * @param {PageProps} props
 */
export function Page({ libraries, initialLibrary, loadLibrary }) {
	initialLibrary = initialLibrary || libraries[0];

	const [selectedLibrary, setSelectedLibrary] = useState(initialLibrary);
	const [loading, setLoading] = useState(true);
	const [Body, setBody] = useState(null);

	useEffect(() => {
		setLibraryInUrl(selectedLibrary);
		loadLibrary(selectedLibrary).then(c => {
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

import { Fragment, createElement } from "preact";
import { useState, useEffect } from "preact/hooks";
import { setLibraryInUrl } from "../utils/url";
import { Loading } from "./Loading";
import { LibraryToolbar } from "./LibraryToolbar";
import style from "./Page.scss";

/**
 * @typedef {(library: string) => Promise<import('preact').AnyComponent>} LibraryLoader
 * @typedef {{ libraries: string[]; loadLibrary: LibraryLoader; initialLibrary?: string | null; Intro: import('preact').AnyComponent }} PageProps
 * @param {PageProps} props
 */
export function Page({ libraries, initialLibrary, loadLibrary, Intro }) {
	const [selectedLibrary, setSelectedLibrary] = useState(initialLibrary);
	const [loading, setLoading] = useState(false);
	const [Body, setBody] = useState(null);

	useEffect(() => {
		setLibraryInUrl(selectedLibrary);
		if (selectedLibrary) {
			setLoading(true);
			loadLibrary(selectedLibrary).then(c => {
				setLoading(false);
				setBody(() => c);
			});
		}
	}, [selectedLibrary, setLoading, setBody]);

	function onLibraryChange(e) {
		setSelectedLibrary(e.target.value);
	}

	return (
		<Fragment>
			<main class={style.page}>
				<LibraryToolbar
					libraries={libraries}
					selectedLibrary={selectedLibrary}
					onChange={onLibraryChange}
				/>
				<div class={style.content}>
					{loading ? <Loading /> : selectedLibrary == "" ? <Intro /> : <Body />}
				</div>
			</main>
		</Fragment>
	);
}

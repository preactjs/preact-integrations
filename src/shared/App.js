import "./style/index.scss";
import { createElement, Fragment } from "preact";
import { Header } from "./components/Header";
import { Page } from "./components/Page";
import { readLibraryFromUrl } from "./utils/url";

/**
 * @param {{ libraries: string[]; loadLibrary: import('./components/Page').LibraryLoader; }} props
 */
export function App(props) {
	return (
		<Fragment>
			<Header />
			<Page initialLibrary={readLibraryFromUrl(props.libraries)} {...props} />
		</Fragment>
	);
}

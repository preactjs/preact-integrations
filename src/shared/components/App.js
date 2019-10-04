import "../style/index.scss";
import { createElement, Fragment } from "preact";
import { Header } from "./Header";

/**
 * @param {{ children: any[] }} props
 */
export function App(props) {
	return (
		<Fragment>
			<Header />
			{props.children}
		</Fragment>
	);
}

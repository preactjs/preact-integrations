import { createElement, Fragment } from "preact";

export function DirectIntro() {
	return (
		<Fragment>
			<h1>Direct Integrations</h1>
			<p>
				Choose a library above to see how to test how it integrates with Preact
			</p>
			<p>
				The libraries in this section can be used directly with Preact - no
				aliasing or compat layer required.
			</p>
		</Fragment>
	);
}

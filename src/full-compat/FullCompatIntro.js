import { createElement, Fragment } from 'preact';

export function FullCompatIntro() {
	return (
		<Fragment>
			<h1>Full Compat Integrations</h1>
			<p>
				Choose a library above to see how to test how it integrates with Preact
			</p>
			<p>
				These libraries require using "preact/compat" to work with Preact. In
				your bundler (e.g. Webpack or Rollup) alias "react" and "react-dom" to
				"preact/compat".
			</p>
		</Fragment>
	);
}

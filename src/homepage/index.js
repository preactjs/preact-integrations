import { createElement, render } from "preact";
import "preact/debug";
import { App } from "../shared/components/App";

render(
	<App>
		<div>
			<h1>Home</h1>
			<p>
				Choose an integration method above (e.g. "Direct" or "Full Compat") to
				test out how libraries integrate with Preact
			</p>
		</div>
	</App>,
	document.getElementById("app")
);

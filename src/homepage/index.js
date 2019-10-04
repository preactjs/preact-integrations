import { createElement, render } from "preact";
import "preact/debug";
import { App } from "../shared/components/App";

render(
	<App>
		<div>
			<h1>Home</h1>
		</div>
	</App>,
	document.getElementById("app")
);

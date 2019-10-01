import { createElement } from "preact";
import { Router, Link } from "preact-router";

const url = path =>
	location.pathname + (location.pathname.endsWith("/") ? "" : "/") + path;

function Home() {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

function About() {
	return (
		<div>
			<h2>About</h2>
		</div>
	);
}

export default function App() {
	return (
		<div>
			<h1>Preact Router</h1>
			<nav>
				<Link activeClassName="active" href={url("")}>
					Home
				</Link>
				<Link activeClassName="active" href={url("about")}>
					About
				</Link>
			</nav>
			<Router>
				<Home path={url("")} />
				<About path={url("about")} />
			</Router>
		</div>
	);
}

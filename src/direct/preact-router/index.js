import { createElement } from "preact";
import { Router, Link } from "preact-router";

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
				<Link activeClassName="active" href="/">
					Home
				</Link>
				<Link activeClassName="active" href="/about">
					About
				</Link>
			</nav>
			<Router>
				<Home path="/" />
				<About path="/about" />
			</Router>
		</div>
	);
}

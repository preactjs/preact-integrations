import { createElement } from "preact";
import { config, getUrl } from "../config";

export function Header() {
	return (
		<header>
			<nav>
				{config.nav.map(route => (
					<a href={getUrl(route.path)}>{route.name}</a>
				))}
			</nav>
		</header>
	);
}

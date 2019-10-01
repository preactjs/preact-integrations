import { createElement } from "preact";
import config from "../config";
import { getUrl } from "../utils/url";
import styles from "./styles.scss";

export function Header() {
	return (
		<header class={styles.header}>
			<nav>
				{config.nav.map(route => (
					<a href={getUrl(route.path)}>{route.name}</a>
				))}
			</nav>
		</header>
	);
}

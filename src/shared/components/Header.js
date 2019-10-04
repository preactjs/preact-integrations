import { createElement } from "preact";
import { useCallback } from "preact/hooks";
import cx from "classcat";
import config from "../config.json";
import githubIcon from "../assets/github.svg";
import twitterIcon from "../assets/twitter.svg";
import { useOverlayToggle } from "../lib/useOverlayToggle";
import { getUrl } from "../utils/url";
import style from "./Header.scss";
import { InvertedLogo } from "./Logo.js";
import Corner from "./Corner.js";

const LINK_FLAIR = {
	logo: InvertedLogo
};

export function Header() {
	// TODO: Consider using ontransitionend to improve height transition
	const url = location.pathname;
	const [open, setOpen] = useOverlayToggle();
	const toggle = useCallback(() => setOpen(!open), [open]);

	return (
		<header class={cx({ [style.header]: true, [style.open]: open })}>
			<div class={style.inner}>
				<Nav class={style.nav} routes={config.nav} current={url} />
				<div class={style.social}>
					<a
						class={style.socialItem}
						aria-label="Browse the code on GitHub"
						href="https://github.com/preactjs/preact"
					>
						<img src={githubIcon} alt="GitHub" width="26" />
					</a>
					<a
						class={style.socialItem}
						aria-label="Follow us on Twitter"
						href="https://twitter.com/preactjs"
					>
						<img src={twitterIcon} alt="Twitter" width="26" />
					</a>
				</div>
				<Hamburgler open={open} onClick={toggle} />
				<Corner />
			</div>
		</header>
	);
}

// hamburgler menu
function Hamburgler({ open, ...props }) {
	return (
		<div class={style.hamburgler} open={open} {...props}>
			<div class={style.hb1} />
			<div class={style.hb2} />
			<div class={style.hb3} />
		</div>
	);
}

/**
 * @typedef {{ nav: Route[]; }} Config
 * @typedef {{ path: string; name: string; title?: string; class?: string; flair?: string; }} Route
 * @param {{ routes: Route[]; current: string; }} props
 */
function Nav({ routes, current, ...props }) {
	return (
		<nav {...props}>
			{routes.map(route => (
				<NavLink
					to={route}
					class={cx([
						route.class,
						{ [style.current]: current.startsWith(getUrl(route.path)) }
					])}
				/>
			))}
		</nav>
	);
}

/**
 * @param {{ to: Route; }} props
 */
function NavLink({ to, ...props }) {
	let Flair = to.flair && LINK_FLAIR[to.flair];
	const href = to.path ? getUrl(to.path) : "javascript:";
	return (
		<a href={href} {...props}>
			{Flair && <Flair />}
			{getRouteName(to)}
		</a>
	);
}

export function getRouteName(route) {
	return route.name || route.title;
}

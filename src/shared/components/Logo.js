import { createElement } from "preact";
import style from "./Header.scss";
import preactLogo from "../assets/preact.svg";

export function Logo() {
	return <img class={style.logo} src={preactLogo} alt="Preact Logo" />;
}

export const InvertedLogo = Logo;

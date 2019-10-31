import { createElement } from 'preact';
import style from './Header.scss';
import preactLogo from '../assets/preact.svg';

export function Logo() {
	return (
		<img width="34" class={style.logo} src={preactLogo} alt="Preact Logo" />
	);
}

export const InvertedLogo = Logo;

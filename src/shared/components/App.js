import style from '../style/index.scss';
import { createElement, Fragment } from 'preact';
import { Header } from './Header';

export function App(props) {
	return (
		<Fragment>
			<Header />
			<main class={style.page}>{props.children}</main>
		</Fragment>
	);
}

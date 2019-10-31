import { createElement } from 'preact';
import style from './corner.scss';

export default function Corner() {
	return (
		<a
			href="https://opencollective.com/preact"
			target="_blank"
			rel="noopener noreferrer"
			class={style.corner}
		>
			<div class={style.cornerText}>
				Help
				<br />
				Support Us
			</div>
		</a>
	);
}

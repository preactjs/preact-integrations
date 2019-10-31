import { createElement } from 'preact';
import style from './LibraryToolbar.scss';

/**
 * @param {{ libraries: string[], selectedLibrary: string; onChange: (e: Event) => void}} props
 */
export function LibraryToolbar({ libraries, selectedLibrary, onChange }) {
	return (
		<div class={style.toolbar}>
			<label>
				<select value={selectedLibrary} onChange={onChange}>
					<option value="">Select a library...</option>
					{libraries.map(library => (
						<option value={library}>{library}</option>
					))}
				</select>
			</label>
		</div>
	);
}

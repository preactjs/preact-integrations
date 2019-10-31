import { createElement, render } from 'preact';
import 'preact/debug';
import { App } from '../shared/components/App';
import { Page } from '../shared/components/Page';
import { readLibraryFromUrl } from '../shared/utils/url';
import { DirectIntro } from './DirectIntro';

/** @type {string[]} */
const libraries = window.PreactIntegrationLibraries;

function loadLibrary(library) {
	return import(`./${library}/index.js`).then(m => m.default);
}

render(
	<App>
		<Page
			initialLibrary={readLibraryFromUrl(libraries)}
			libraries={libraries}
			loadLibrary={loadLibrary}
			Intro={DirectIntro}
		/>
	</App>,
	document.getElementById('app')
);

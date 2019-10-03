* Style page content
* Add two frameworks to each category
* Use a combobox for selecting a framework
	* [Native datalist](https://caniuse.com/#feat=datalist)
	* [Reach UI combobox](https://ui.reach.tech/combobox/)
	* [Downshift library](https://downshift.netlify.com/)
	* [React-select](https://react-select.com/)
	* [Lightning Design System combobox](https://www.lightningdesignsystem.com/components/combobox/)
	* [Carbon Design System combobox](https://www.carbondesignsystem.com/components/dropdown/code/)
* Consider recommending the [Puppeteer Recorder](https://chrome.google.com/webstore/detail/puppeteer-recorder/djeegiggegleadkkbgopoonhjimgehda) when contributing tests


* Add option to specify custom preact file to use
* Webpack should re-bundle when preact changes 
* Ideally people could run dev & tests and point them to a local build of preact
* Perhaps test watch files and rerun on file change (e.g. local build of preact)

* Add "Open in Sandbox" button using [CodeSandbox define api](https://codesandbox.io/docs/importing#define-api)
	* Need a way to download source files and build request for CodeSandbox
	* Should it display source like PreactJS website repl?
	* Does each library integration need its own "package.json" for this to work?

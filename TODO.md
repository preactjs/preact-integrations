* Write homepage, and intro
* Style page content
* Perhaps test command watches files and reruns tests on file change (including custom preact file)
* Add two frameworks to each category


* Add metadata for each library in the directory to display on the libraries page
	* Link to github page
	* Perhaps add option to display the libraries' readme?
	* Or pull the one-line description of the library and display on the site
* Use a combobox for selecting a framework
	* [Native datalist](https://caniuse.com/#feat=datalist)
	* [Reach UI combobox](https://ui.reach.tech/combobox/)
	* [Downshift library](https://downshift.netlify.com/)
	* [React-select](https://react-select.com/)
	* [Lightning Design System combobox](https://www.lightningdesignsystem.com/components/combobox/)
	* [Carbon Design System combobox](https://www.carbondesignsystem.com/components/dropdown/code/)
* Consider recommending the [Puppeteer Recorder](https://chrome.google.com/webstore/detail/puppeteer-recorder/djeegiggegleadkkbgopoonhjimgehda) when contributing tests


* Add "Open in Sandbox" button using [CodeSandbox define api](https://codesandbox.io/docs/importing#define-api)
	* Need a way to download source files and build request for CodeSandbox
	* Should it display source like PreactJS website repl?
	* Does each library integration need its own "package.json" for this to work?

* Write contributing guide, homepage, and intro
* Update test infra
	* Add option to [launch tests in debug mode](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-environment-puppeteer#jest-puppeteerconfigjs)
	* Use [jest-dev-server](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-dev-server) to manage dev server life while test run
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


* Add option to specify custom preact file to use when building, testing, etc.
* Webpack should re-bundle when custom preact file changes 
* Perhaps test command watches files and reruns tests on file change (including custom preact file)


* Add "Open in Sandbox" button using [CodeSandbox define api](https://codesandbox.io/docs/importing#define-api)
	* Need a way to download source files and build request for CodeSandbox
	* Should it display source like PreactJS website repl?
	* Does each library integration need its own "package.json" for this to work?

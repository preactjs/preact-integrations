# Contributing

First off, thanks for taking the time to help out our project 🎉

There are many ways you can contribute. Below is a guide to some of those ways.

## Table of Contents

* [Request a library](#request-a-library)
* [Adding libraries](#adding-libraries)
* [Adding tests](#adding-tests)
* [File issues for bugs in sample apps](#file-issues-for-bugs-in-sample-apps)
* [Fix bugs in sample apps](#fix-bugs-in-sample-apps)

## Request a library

If you have a library that you'd like to see added to this website, [open a new issue]() and select the "Library Request" template. Fill in the requested details and press "Submit" when done.

## Adding libraries

If you'd like to add a library to this project, follow these steps:

1. See if there is an issue request
	Search the issues of this repo for any issues labeled "request" for this library. If there is one, leave a comment letting us know you are working on it

1. Fork our repository, clone your fork locally, and create a local branch to make your changes
	To learn about forks, check out [the Github docs on forks](https://help.github.com/en/articles/fork-a-repo). See our [Readme](./Readme.md] for instructions on how to setup and build our repository.

1. Add a new folder to either "direct" or "full-compat" and add `index.js` inside your folder
	When you are ready to start coding, determine which folder you app should go in. If your library needs to use `preact/compat`, put it in the "full-compat" directory. If you aren't sure, start with the `full-compat`.

	Inside that folder, you must have at least a single `index.js` file that exports a the root Preact component for your app. You can add more files to folder if you wish. Only the `index.js` is required.

1. Build the app
	Simple apps that demonstrate the basic the functionality of the library are great. It doesn't need to cover every single feature - just the major ones. Sample apps from the library's documentation or getting started guide are usually great candidates.

	If possible, try to avoid apps that rely on specific timings (like a clock). These kinds of apps are harder to write tests for. For some libraries (e.g. animations or clock libraries) this is unavoidable, and that's okay. But if possible, try to write apps that are deterministic based on user input. These apps are generally eaiser to test.

1. Add a couple tests (optional but greatly appreciated)
	See the [next section](#adding-tests) on how to add tests for your library

1. Submit a Pull Request
	Check out the Github docs on [creating a pull request from a fork](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) for instructions on how to do this.

## Adding tests

Once your app is working, add some basic tests to assert that Preact continues to work properly with this library in the future.

1. Create `<library>.test.js` in the `tests` folder
	In the `tests` folder, add a file into the directory that matches where you put your app named `<library>.test.js`. Paste in the following boilerplate to get your test started, replacing `<library>` with the name of your library (specifically, the name of the folder you added in `src`).

	```js
	import { goToLibraryPage } from "../util";

	describe("<library>", () => {
		beforeEach(async () => {
			// Arrange: Loads your app into the Puppeteer
			await goToLibraryPage("<library>");
		});

		it("should exist", async () => {
			// DO: Replace this test with a real test for your library

			// Act: Perform some action
			await page.click("body");

			// Assert: Expected result
			const contents = await page.content();
			expect(contents).toMatch(/<library>/);
		});
	});
	```

1. Write your tests
	Our tests use Jest and Puppeteer to assert the app loads and functions. Generally, tests should load the app, perform some action, and assert (using `expect`) that the library and Preact rendered the expected result.

	If you've never used Jest before, [this guide on the `expect` function](https://jestjs.io/docs/en/using-matchers) is a good place to start.

	If you've never used Puppeteer before, this [blog on writing E2E tests with Puppeteer](https://ropig.com/blog/end-end-tests-dont-suck-puppeteer/) is a good primer. The [Puppeteer docs](https://pptr.dev/) are also very comprehensive. Particularly, the [docs on the Page object](https://pptr.dev/#?show=api-class-page) are will be helpful when writing tests.

	We use `jest-puppeteer` to hook up Jest and Puppeteer together. This setup exposes a global `page` object you can use to interact with the webpage. Most Puppeteer methods return promises, so use `async/await` liberally in your tests to make then readable.
	
1. Submit a Pull Request
	Check out the Github docs on [creating a pull request from a fork](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) for instructions on how to do this.

## File issues for bugs in sample apps

If you see a bug in how a sample app is built, open an issue describing what the problem is and what you would expect instead. Use our "Bug report" issue template.

> NOTE: If the bug is related to a sample app not working, this might be caused by a bug in Preact itself. Open the issue in the [Preact repo][] so that the Preact maintainers see it. Only open issues in this repo for bugs related to code in this repo. For example, if you'd like to see an app rewritten using a newer version of a library, open an issue here. But if an app isn't working and it seems to be coded correctly, open an issue in the [Preact repo][].

## Fix bugs in sample apps

If you see issues you think you can fix, open a Pull Request to fix them! We love help from our community ♥.

[Fork and clone our repository](https://help.github.com/en/articles/fork-a-repo), make the fix in [a local branch of your fork](https://help.github.com/en/articles/creating-and-deleting-branches-within-your-repository), and open [a Pull Request to our repository][creating a pull request from a fork].


[Preact repo]: https://github.com/preactjs/preact
[creating a pull request from a fork]: https://help.github.com/en/articles/creating-a-pull-request-from-a-fork

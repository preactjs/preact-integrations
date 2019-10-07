# Preact Integrations

A collection of sample apps demonstrating Preact's compatibility with various 3rd party libraries

---

## ✨ Description

This repo contains a collection of simple Preact apps that demonstrate how to use preact with various 3rd party libraries including `react-redux`, `mobx-react`, `react-router`, and more!

The apps are divided into 2 categories: direct and full-compat. Libraries in the "src/direct" directory can be used with `preact` directly and don't require `preact/compat`. Libraries in the "full-compat" directory require aliasing `react` to `preact/compat`.

We are looking for contributors to add more libraries to this repository! If that's you, read on to find out how to get started!

---

## 🤝 Contributing

There are many ways to help our project. Some include:

* Request a library to add
* Adding libraries
* Adding tests for libraries
* File issues for bugs in sample apps
* Fixing bugs in sample apps

Check out our [CONTRIBUTING][CONTRIBUTING.md] guide for details on how to contribute.

---

## 🛠 Setup and building

Follow these steps to setup and run this project locally.

1. Install NPM dependencies
	`npm install`

1. Run our `dev` script to build the project and start the development server
	`npm run dev`

---

## 🏎 Development scripts

Our package.json comes with same basic scripts to help you get started working in our repo. When using `npm` to run our commands, be sure to add ` -- ` before passing in any options to make sure they reach our script and aren't consumed by `npm`.

### dev

The `dev` script will watch the files in `src` and re-build our scripts when one of them changes. If you know what library you are working on and just want to watch those files, pass the name of the library to the dev script like so: `npm run dev preact-router`. This command will start the dev server and only watch the files necessary to re-build the script bundle that includes `preact-router`.

```bash
$ npm run dev -- --help

  Description
    Watch src files of the passed in libraries (defaults to all), build them on change, and run a web server to serve them

  Usage
    $ scripts dev [libraries] [options]

  Options
    -m, --mode    'production' or 'development'  (default development)
    --debug       Print out debugging info  (default false)
    -h, --help    Displays this message
```

### build

```bash
$ npm run build -- --help

  Description
    Build the bundles that include the libraries passed in (defaults to building all)

  Usage
    $ scripts build [libraries] [options]

  Options
    -m, --mode     'production' or 'development'  (default production)
    -w, --watch    Watch source files and rebuild on change  (default false)
    --debug        Print out debugging info  (default false)
    -h, --help     Displays this message
```

### test

The test command just runs `jest` so all [Jest CLI options](https://jestjs.io/docs/en/cli) are supported. The most useful one is passing in a pattern to filter which tests are run. For example, if you only want to run the `preact-router` tests, just pass in the string `preact-router` to only run tests that match that pattern:

```bash
npm run test preact-router
```

### test:debug

Launch `jest` and `puppeteer` with options to enable debugging the tests in Chromium. This will launch Chromium with headless turned off and devtools turned on. These options enable you to call `jestPuppeteer.debug()` in your test to pause jest and pause the browser. See the [`jest-puppeteer` docs for more info](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-environment-puppeteer#globaljestpuppeteerdebug).

Also see the ["Debugging tests" section](./CONTRIBUTING.md#debugging-tests) in the CONTRIBUTING guide.

### serve

```bash
$ npm run serve -- --help

  Description
    Run a development web server

  Usage
    $ scripts serve [options]

  Options
    --debug       Print out debugging info  (default false)
    -h, --help    Displays this message
```

---

## 👀 Code Reviews

All submissions, including submissions by project members, require review. It's a great way to learn. We use GitHub pull requests for this purpose. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information on using pull requests.

---

## 🥂 License

MIT

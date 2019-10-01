import {
	readLibraryFromUrl,
	setLibraryInUrl
} from "../../src/shared/utils/url";

describe("URL utilities", () => {
	const bundles = ["direct", "direct-compat", "full-compat"];
	const libraries = ["router", "preact-router", "prism.js"];

	function testUrl(path) {
		return `https://preactjs.github.io/preact-integrations${path}`;
	}

	describe("readLibraryFromUrl", () => {
		function run(url) {
			return readLibraryFromUrl(libraries, url);
		}

		it("should extract library from valid URL", () => {
			for (let bundle of bundles) {
				for (let library of libraries) {
					expect(run(testUrl(`/${bundle}/${library}`))).toBe(library);
					expect(run(testUrl(`/${bundle}/${library}/`))).toBe(library);
					expect(run(testUrl(`/${bundle}/${library}/nav1`))).toBe(library);
					expect(run(testUrl(`/${bundle}/${library}/nav1/`))).toBe(library);
				}
			}
		});

		it("should return null for URLs missing a library", () => {
			expect(run(testUrl())).toBeNull;
			expect(run(testUrl("/"))).toBeNull;
			for (let bundle of bundles) {
				expect(run(testUrl(`/${bundle}`))).toBeNull;
				expect(run(testUrl(`/${bundle}/`))).toBeNull;
			}
		});

		it("should return null for URLs containing non-valid libraries", () => {
			expect(run(testUrl("/direct/non-valid-library"))).toBeNull;
		});
	});

	describe("setLibraryInUrl", () => {
		/** @type {jest.Mock} */
		let pushStateSpy;

		beforeEach(() => {
			pushStateSpy = jest.fn();
			global.history = {
				pushState: pushStateSpy
			};
		});

		it("properly sets the library when no library is present", () => {
			for (let bundle of bundles) {
				for (let library of libraries) {
					const expectedUrl = testUrl(`/${bundle}/${library}/`);

					setLibraryInUrl(library, testUrl(`/${bundle}`));
					expect(pushStateSpy).toHaveBeenCalledWith({}, "", expectedUrl);
					pushStateSpy.mockClear();

					setLibraryInUrl(library, testUrl(`/${bundle}/`));
					expect(pushStateSpy).toHaveBeenCalledWith({}, "", expectedUrl);
					pushStateSpy.mockClear();
				}
			}
		});

		it("properly sets the library in URLs where another library is present", () => {
			for (let bundle of bundles) {
				for (let lib1 of libraries) {
					for (let lib2 of libraries) {
						const expectedUrl = testUrl(`/${bundle}/${lib1}/`);

						setLibraryInUrl(lib1, testUrl(`/${bundle}/${lib2}`));
						expect(pushStateSpy).toHaveBeenCalledWith({}, "", expectedUrl);
						pushStateSpy.mockClear();

						setLibraryInUrl(lib1, testUrl(`/${bundle}/${lib2}/`));
						expect(pushStateSpy).toHaveBeenCalledWith({}, "", expectedUrl);
						pushStateSpy.mockClear();
					}
				}
			}
		});

		it("removes extra paths from the url", () => {
			setLibraryInUrl("material", testUrl(`/direct/preact-router/home`));

			const expectedUrl = testUrl(`/direct/material/`);
			expect(pushStateSpy).toHaveBeenCalledWith({}, "", expectedUrl);
		});
	});
});

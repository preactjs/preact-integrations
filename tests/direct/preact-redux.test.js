import { goToLibraryPage } from "../util";

describe("preact-redux", () => {
	beforeEach(async () => {
		// Arrange: Loads your app into the Puppeteer
		await goToLibraryPage("preact-redux");
	});

	it("should exist", async () => {
		// Act: Perform some action
		await page.click("body");

		// Assert: Expected result
		const contents = await page.content();
		expect(contents).toMatch(/Preact Redux/);
	});
});

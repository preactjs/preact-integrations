import { goToLibraryPage } from "../util";

describe("preact-redux", () => {
	beforeEach(async () => {
		await goToLibraryPage("preact-redux");
	});

	it("should exist", async () => {
		const contents = await page.content();
		expect(contents).toMatch(/Preact Redux/);
	});
});

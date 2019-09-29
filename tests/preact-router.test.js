import { goToLibraryPage } from "./lib/util";

describe("preact-router", () => {
	beforeEach(async () => {
		await goToLibraryPage("preact-router");
	});

	it("should exist", async () => {
		const contents = await page.content();
		expect(contents).toMatch(/Preact Router/);
	});
});

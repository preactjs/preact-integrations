import { goToLibraryPage } from "../util";

describe("preact-router", () => {
	const linksSel = index => `#links li:nth-child(${index + 1}) a`;
	const pageContentSel = "#router-content";

	function getRouterContent() {
		return page.$eval(pageContentSel, e => e.textContent);
	}

	beforeEach(async () => {
		await goToLibraryPage("preact-router");
	});

	it("should change route on link click", async () => {
		expect(await getRouterContent()).toMatch(/Page 1/);
		expect(page.url()).toMatch(/preact-router\/?/);

		await page.click(linksSel(1));

		expect(await getRouterContent()).toMatch(/Page 2/);
		expect(page.url()).toMatch(/preact-router\/page2\/?/);
	});
});

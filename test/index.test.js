import { render, h } from "preact";
import { setupScratch, teardown } from "./utils";
import { App } from "../lib/index";

describe("index", () => {
	/** @type {HTMLDivElement} */
	let scratch;

	beforeEach(() => {
		scratch = setupScratch();
	});

	afterEach(() => {
		teardown(scratch);
		scratch = null;
	});

	it("renders Hello World", () => {
		render(<App />, scratch);
		expect(scratch.innerHTML).toBe("<div>Hello World!</div>");
	});
});

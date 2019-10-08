import { goToLibraryPage } from "../util";

describe("react-redux", () => {
	const emptyListText = "No todos, yay!";
	const completeSign = "👌";
	const incompleteSign = "👋";

	const inputSel = "#add-todo-input";
	const addTodoBtnSel = "#add-todo-btn";
	const todoListSel = "#todo-list";
	const todoSel = "#todo-list li[class*=todo-item]";
	const allFilterSel = "#filter-all";
	const completedFilterSel = "#filter-completed";
	const incompleteFilterSel = "#filter-incomplete";

	const mockTodos = ["Todo 1", "Todo 2", "Todo 3"];

	function getTodos() {
		return page.$$eval(todoSel, elements => elements.map(e => e.textContent));
	}

	async function addTodo(todoText) {
		await page.type(inputSel, todoText);
		await page.click(addTodoBtnSel);
	}

	function markTodoCompleted(index) {
		return page.click(todoSel + `:nth-child(${index + 1})`);
	}

	function todoItemText(todoText, completed = false) {
		return `${completed ? completeSign : incompleteSign} ${todoText}`;
	}

	async function verifyListIsEmpty() {
		const todoContents = await page.$eval(todoListSel, e => e.textContent);
		expect(todoContents).toBe(emptyListText);
	}

	/**
	 * @param {string[]} all
	 * @param {string[]} complete
	 * @param {string[]} incomplete
	 */
	async function verifyFilters(all, complete, incomplete) {
		await page.click(allFilterSel);
		if (all.length) {
			expect(await getTodos()).toEqual(all);
		} else {
			await verifyListIsEmpty();
		}

		await page.click(completedFilterSel);
		if (complete.length) {
			expect(await getTodos()).toEqual(complete);
		} else {
			await verifyListIsEmpty();
		}

		await page.click(incompleteFilterSel);
		if (incomplete.length) {
			expect(await getTodos()).toEqual(incomplete);
		} else {
			await verifyListIsEmpty();
		}

		// Reset list to "all"
		await page.click(allFilterSel);
	}

	beforeEach(async () => {
		await goToLibraryPage("react-redux");
	});

	it("should render", async () => {
		const contents = await page.content();
		expect(contents).toMatch(/Todo List/);
	});

	it("should add todos to the list", async () => {
		const todoContents = await page.$eval(todoListSel, e => e.textContent);
		expect(todoContents).toBe(emptyListText);

		await addTodo(mockTodos[0]);
		expect(await getTodos()).toEqual([todoItemText(mockTodos[0])]);

		await addTodo(mockTodos[1]);
		expect(await getTodos()).toEqual([
			todoItemText(mockTodos[0]),
			todoItemText(mockTodos[1])
		]);

		await addTodo(mockTodos[2]);
		expect(await getTodos()).toEqual(mockTodos.map(todo => todoItemText(todo)));
	});

	it("should mark todos as completed", async () => {
		await addTodo(mockTodos[0]);
		expect(await getTodos()).toEqual([todoItemText(mockTodos[0])]);

		await markTodoCompleted(0);
		expect(await getTodos()).toEqual([todoItemText(mockTodos[0], true)]);
	});

	it("should properly filter todos", async () => {
		await addTodo(mockTodos[0]);
		await verifyFilters(
			[todoItemText(mockTodos[0])],
			[],
			[todoItemText(mockTodos[0])]
		);

		await markTodoCompleted(0);
		await verifyFilters(
			[todoItemText(mockTodos[0], true)],
			[todoItemText(mockTodos[0], true)],
			[]
		);

		await addTodo(mockTodos[1]);
		await verifyFilters(
			[todoItemText(mockTodos[0], true), todoItemText(mockTodos[1])],
			[todoItemText(mockTodos[0], true)],
			[todoItemText(mockTodos[1])]
		);

		await markTodoCompleted(1);
		await verifyFilters(
			[todoItemText(mockTodos[0], true), todoItemText(mockTodos[1], true)],
			[todoItemText(mockTodos[0], true), todoItemText(mockTodos[1], true)],
			[]
		);
	});
});

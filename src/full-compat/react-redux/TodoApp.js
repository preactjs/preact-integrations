import { createElement } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import styles from "./styles.css";

export default function TodoApp() {
	return (
		<div className={styles["todo-app"]}>
			<h1>Todo List</h1>
			<AddTodo />
			<TodoList />
			<VisibilityFilters />
		</div>
	);
}

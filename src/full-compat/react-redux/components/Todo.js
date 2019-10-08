import { createElement } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleTodo } from "../redux/actions";
import styles from "../styles.css";

const Todo = ({ todo, toggleTodo }) => (
	<li className={styles["todo-item"]} onClick={() => toggleTodo(todo.id)}>
		{todo && todo.completed ? "👌" : "👋"}{" "}
		<span
			className={cx(
				styles["todo-item__text"],
				todo && todo.completed && styles["todo-item__text--completed"]
			)}
		>
			{todo.content}
		</span>
	</li>
);

// export default Todo;
export default connect(
	null,
	{ toggleTodo }
)(Todo);

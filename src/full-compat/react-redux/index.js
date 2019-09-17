import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { createElement, Component } from "preact";

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";

const store = createStore((state = [], action) => {
	switch (action.type) {
		case ADD_TODO:
			return [...state, action.payload];
		case REMOVE_TODO:
			return state.filter(todo => todo != action.payload);
		default:
			return state;
	}
});

function mapStateToProps(state) {
	return { todos: state };
}

function mapDispatchToProps(dispatch) {
	return {
		addTodo(content) {
			dispatch({
				type: ADD_TODO,
				payload: content
			});
		},
		removeTodo(content) {
			dispatch({
				type: REMOVE_TODO,
				payload: content
			});
		}
	};
}

class TodoApp extends Component {
	state = { value: "" };

	setValue = e => {
		this.setState({ value: e.target.value });
	};

	addTodo = () => {
		this.props.addTodo(this.state.value);
		this.setState({ value: "" });
	};

	render() {
		return (
			<div>
				<form onSubmit={this.addTodo} action="javascript:">
					<input value={this.state.value} onInput={this.setValue} />
					<button type="submit">Add Todo</button>
				</form>
				<ul>
					{this.props.todos.map(todo => (
						<li>{todo}</li>
					))}
				</ul>
			</div>
		);
	}
}

const TodoConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoApp);

export default function() {
	return (
		<Provider store={store}>
			<TodoConnected />
		</Provider>
	);
}

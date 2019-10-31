import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions';
import styles from '../styles.css';

class AddTodo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { input: '' };
	}

	updateInput = input => {
		this.setState({ input });
	};

	handleAddTodo = () => {
		this.props.addTodo(this.state.input);
		this.setState({ input: '' });
	};

	render() {
		return (
			<div>
				<input
					id="add-todo-input"
					onChange={e => this.updateInput(e.target.value)}
					value={this.state.input}
				/>
				<button
					id="add-todo-btn"
					className={styles['add-todo']}
					onClick={this.handleAddTodo}
				>
					Add Todo
				</button>
			</div>
		);
	}
}

export default connect(
	null,
	{ addTodo }
)(AddTodo);
// export default AddTodo;

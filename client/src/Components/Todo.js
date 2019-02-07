import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

function Todo(props) {
    // const [ todoState, setTodoState ] = useState({userInput: '', todoList: []})

	const [ todoName, setTodoName ] = useState('')
	const [ todoList, addTodoToList ] = useState([])
	
	
	useEffect(function() {
		axios.get('http://localhost:5000/get-items').then(res => {
			addTodoToList(res.data)
		}).catch(e => console.log(e.message))
	}, [])
	
	function inputChangeHandler(event) {
		setTodoName(event.target.value)
	}

	async function addTodo(e) {
		e.preventDefault()
		await addTodoToList([...todoList, {name: todoName}])
		console.log(todoName)
	
		await axios.post('http://localhost:5000/add-item', {name: todoName})
	}

	return (
		<Fragment>
			<input type="text" placeholder="todo" onChange={inputChangeHandler} value={todoName} />
			<button onClick={addTodo}>Add</button>
			<ul>{todoList.map((yo, index) => <li key={index}>{yo.name}</li>)}</ul>
		</Fragment>
	)
}

export default Todo

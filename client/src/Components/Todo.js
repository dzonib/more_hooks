import React, { Fragment, useState, useEffect, useReducer } from 'react'
import axios from 'axios'

function todo(props) {
    // const [ todoState, setTodoState ] = useState({userInput: '', todoList: []})

	let [ todoName, setTodoName ] = useState('')
	// const [ todoList, addTodoToList ] = useState([])
	
	const todoListReducer = (state, action) => {
		switch(action.type) {
			case 'ADD':
				console.log(state)
				return [...state, {name: action.payload}]
				case 'SET':
					return action.payload
			case 'REMOVE':
				return state.filter((todo) => todo.id !== action.payload)
			default:
				return state
		}
	}

	const initialState = []

	const [todoList, dispatch] = useReducer(todoListReducer, initialState)

	
	useEffect(() => {
		axios.get('http://localhost:5000/get-items').then(res => {
			dispatch({type: 'SET', payload: res.data})
		}).catch(e => console.log(e.message))
		return () => {
			// console.log('cleanup')
		}
	}, [])



	// if second argument is empty (no array at the end) it will run for every render cycle
	// if array is empty use effect will only run when component is mounted
	// if you put value inside it will render only when that value changes (component did mount/update)

	// function mouseMoveHandler(event) {
	// 	console.log(event.clientX, event.clientY)
	// }

	// useEffect(() => {
	// 	document.addEventListener('mousemove', mouseMoveHandler)
	// 	return () => {
	// 		document.removeEventListener('mousemove', mouseMoveHandler)
	// 	}
	// }, [])
	// array indicates that we will cleenup when component unmounts
	
	function inputChangeHandler(event) {
		setTodoName(event.target.value)
	}

	async function addTodo(e) {
		e.preventDefault()
		await dispatch({type: "ADD", payload: todoName})
		await axios.post('http://localhost:5000/add-item', {name: todoName})
	}

	const removeHandler = async ({id}) => {
		dispatch({type: "REMOVE", payload: id})
		await axios.delete(`http://localhost:5000/remove/${id}`)
	}

	return (
		<Fragment>
			<input type="text" placeholder="todo" onChange={inputChangeHandler} value={todoName} />
			<button onClick={addTodo}>Add</button>
			<ul>{todoList.map((yo, index) => <li key={index} onClick={() => removeHandler(yo)}>{yo.name}</li>)}</ul>
		</Fragment>
	)
}

export default todo

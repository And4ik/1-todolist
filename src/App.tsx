import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
type TasksStateType = {
	[key:string]:TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})



	const removeTask = (todolistId:string,taskId: string) => {
	setTasks({...tasks,[todolistId]: tasks[todolistId].filter(t=> t.id!==taskId)})
	}

	const addTask = (todolistId:string,title: string) => {
		const newTask = { id: v1(), title: title, isDone: true }
		setTasks({...tasks, [todolistId]: [newTask,...tasks[todolistId]]})

	}

	const changeFilter = (todolistId:string,filter: FilterValuesType) => {
		setTodolists(todolists.map(tl=> tl.id === todolistId ? {...tl,filter:filter}:tl))
	}

	const changeTaskStatus = (todolistId:string,taskId: string, taskStatus: boolean) => {
		setTasks({...tasks,[todolistId]: tasks [todolistId].map(t=> t.id == taskId ? {...t, isDone:taskStatus}: t)})
	}
	const removeTodolist = (todolistId:string) => {
		setTodolists(todolists.filter(tl=> tl.id !== todolistId ))
		delete tasks[todolistId]
		setTasks({...tasks})
	}


	return (
		<div className="App">
			{todolists.map(tl=> {
				let tasksForTodolist = tasks[tl.id]
				if (tl.filter === 'active') {
					tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
				}
				return(
					<Todolist
						key={tl.id}
						todolistId={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
					/>
				)
			})}

		</div>
	);
}

export default App;

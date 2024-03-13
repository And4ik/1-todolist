import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	removeTask: (todolistId:string,taskId: string) => void
	changeFilter: (todolistId:string,filter: FilterValuesType) => void
	addTask: (todolistId:string,title: string) => void
	changeTaskStatus: (todolistId:string,taskId: string, taskStatus: boolean) => void
	filter: FilterValuesType
	removeTodolist:(todolistId:string)=> void
}

export const Todolist = (props: PropsType) => {
	const {todolistId,title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus,removeTodolist} = props

	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addTaskHandler = () => {
		if (taskTitle.trim() !== '') {
			addTask(props.todolistId,taskTitle.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const changeFilterTasksHandler = (todolistId:string,filter: FilterValuesType) => {
		changeFilter(props.todolistId,filter)
	}
	const removeTodolistHandler = () => {
		removeTodolist(props.todolistId)
	}
	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3>{title}</h3>
				<Button title={"X"} onClick={removeTodolistHandler}/>
			</div>
			<div>
				<input
					className={error ? 'error': ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={'error-message'}>{error}</div> }
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(todolistId,task.id)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(props.todolistId,task.id, newStatusValue)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler(props.todolistId,'all')}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler(props.todolistId,'active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler(props.todolistId,'completed')}/>
			</div>
		</div>
	)
}

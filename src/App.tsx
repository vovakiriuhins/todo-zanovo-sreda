import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./AppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type FilterValuesType = "All" | "Active" | "Completed"

export type TodolistsType = {
    id: string
    title: string
    filter: string
}

export type TaskStateType = {
    [key: string]: TasksType[]
}

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'HTML & CSS', isDone: false},
            {id: v1(), title: 'Java', isDone: false},
        ]
    })

    const updateTask = (todolistId: string, taskId: string, updatedTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: updatedTitle} : t)
        })
    }

    const updateTodolistTitle = (todolistId: string, updatedTitle: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: updatedTitle} : t))
    }


    let addTask = (todolistId: string, newTaskTitle: string) => {
        let newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const addTodolist = (newTitle: string) => {
        let newTodolistId = v1();
        let newTodolist = {id: newTodolistId, title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    // let tasksForTodolist = tasks
    //
    // if (filter === "Completed") tasksForTodolist = tasks.filter(t => t.isDone)
    // if (filter === "Active") tasksForTodolist = tasks.filter(t => !t.isDone)

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: value} : t))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        // setTasks(tasks.filter(t => t.id !== taskId))
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeTaskStatus = (taskId: string, todolistId: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={(title) => {addTodolist(title)}}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]

                        if (tl.filter === "Completed")
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                        if (tl.filter === "Active")
                            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)

                        return <Grid item key={tl.id}>
                            <Paper elevation={10} style={{padding: "10px"}}>
                            <Todolist key={tl.id}
                                      id={tl.id}
                                      title={tl.title}
                                      tasks={tasksForTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeTaskStatus}
                                      filter={tl.filter}
                                      removeTodolist={removeTodolist}
                                      updateTask={updateTask}
                                      updateTodolistTitle={updateTodolistTitle}
                            />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>

        </div>
    );
}

    export default App;
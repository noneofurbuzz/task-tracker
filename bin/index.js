#!/usr/bin/env node

const taskManager = require('../index.js')
const fs = require('fs')
const chalk = require('chalk')
const {Command} = require('commander')
const program = new Command();

program
    .name('task-cli')
    .description("A simple CLI tool to manage tasks")
    .version('1.0.0')
program
    .command('add [description]')
    .description('Add a task')
    .action((description) => {
        if (description != null & description != ""){
        let data = taskManager.readFile()
        let addedTask = taskManager.addTask()
        addedTask.description = description
        addedTask.id = (data.length) + 1
        data.push(addedTask) 
        data = JSON.stringify(data,null,5)
        fs.writeFileSync('tasks.json',data,(err) => {
            if (err) throw err
        })
        console.log(chalk.hex('#4bb543').bold(`Task added successfully (ID: ${addedTask.id})`))
    }
    else{
        console.log(chalk.red.bold("Warning: missing task description"))
        console.log(chalk.bold("Example: task-cli add 'Buy groceries'"))
    }
    })
program
    .command('delete [id]')
    .description('Delete a task')
    .action((id) => {
        if (id != null & id != ""){
        let data = taskManager.readFile()
        if (data.length >= id){
        let deleteTask = data.filter((task) => task.id != id)
        let updatedTaskList = deleteTask.map((task) => {
            task.id = deleteTask.indexOf(task) + 1               
        }
        )
        
            deleteTask = JSON.stringify(deleteTask,null,5)
            fs.writeFileSync('tasks.json',deleteTask,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543').bold("Task deleted successfully"))
        }
        else{
            console.log(chalk.red.bold(`No such (ID: ${id}) exists. No tasks deleted`))
        }
        }else{
            console.log(chalk.red.bold("Warning: missing task ID"))
        console.log(chalk.bold("Example: task-cli delete 1"))
        console.log(chalk.bold("Run 'task-cli list' to view existing tasks and their corresponding IDs"))
        }})
program
        .command('update [id] [description]')
        .description('Update a task')
        .action((id,description) => {
            let data = taskManager.readFile()
            if ((description != null & description != "") ||  (id != null & id != "")){
            if (data.length >= id){
                data[id-1].description = description
                data[id-1].updatedAt = new Date()
                data = JSON.stringify(data,null,5)
                fs.writeFileSync('tasks.json',data,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543').bold(`Task updated successfully (ID: ${id})`))
            }
            else{
                console.log(chalk.red.bold(`No such (ID: ${id}) exists. No tasks updated`))
            }
        }else{
            console.log(chalk.red.bold("Warning: missing task ID or description"))
        console.log(chalk.bold("Example: task-cli update 1 'Buy groceries and cook dinner'"))
        console.log(chalk.bold("Run 'task-cli list' to view existing tasks and their corresponding IDs"))
        }

        })
program
        .command('mark-done [id]')
        .description("Mark a task as done")
        .action((id) => {
            let data = taskManager.readFile()
            if  (id != null & id != ""){
            if (data.length >= id){
            data[id - 1].status = "done"
            data = JSON.stringify(data,null,5)
            fs.writeFileSync('tasks.json',data,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543').bold(`Task marked as done (ID: ${id})`))
            }
            else{
                console.log(chalk.red.bold(`No such (ID: ${id}) exists`))
            }
        }else{
            console.log(chalk.red.bold("Warning: missing task ID"))
        console.log(chalk.bold("Example: task-cli mark-done 1"))
        console.log(chalk.bold("Run 'task-cli list' to view existing tasks and their corresponding IDs"))
        }})
program
        .command('mark-in-progress [id]')
        .description("Mark a task as in progress")
        .action((id) => {
            let data = taskManager.readFile()
            if (id != null & id != ""){
            if (data.length >= id){
            data[id - 1].status = "in-progress"
            data = JSON.stringify(data,null,5)
            fs.writeFileSync('tasks.json',data,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543').bold(`Task marked as in-progress (ID: ${id})`))
            }
            else{
                console.log(chalk.red.bold(`No such (ID: ${id}) exists`))
            }
        }else{
            console.log(chalk.red.bold("Warning: missing task ID"))
        console.log(chalk.bold("Example: task-cli mark-in-progress 1"))
        console.log(chalk.bold("Run 'task-cli list' to view existing tasks and their corresponding IDs"))
        }})
program
        .command('list [status]')
        .description("List all tasks or list tasks by status")
        .action((status) => {
            let data = taskManager.readFile()
            if (status == null){
                if (data.length != 0){ 
                    console.log(chalk.bold("Listing all tasks:"))
                for (let i = 0;i < data.length;i = i + 1){
                console.log(`${chalk.bold(`${data[i].id}. ${data[i].description}`)} ${data[i].status == "in-progress" ? chalk.yellow.bold(`(status: ${data[i].status})`) : (data[i].status == "done" ? chalk.hex('4bb543').bold(`(status: ${data[i].status})`) : chalk.red.bold(`(status: ${data[i].status})`)) } ${chalk.blue.bold(`[ID: ${data[i].id}]`)}`)
                }
            }
            else{
                console.log(chalk.bold("No tasks found"))
            }
        }
            else if (status == "done"){
                let index = 1
                let count = 1
                let statusCount = []
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "done"){
                        statusCount.push(data[i].status)
                        while(count == 1){
                            console.log(`${chalk.bold(`Listing tasks by `)}${chalk.hex('4bb543').bold(`(status: done)`)}:`)
                            count ++
                        }
                        console.log(`${chalk.bold(`${index}. ${data[i].description}`)} ${chalk.blue.bold(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                    }
                    if(statusCount.length == 0){
                        console.log(chalk.bold("No tasks found"))
                }}
            else if (status == "in-progress"){
                let index = 1
                let count = 1
                let statusCount = []
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "in-progress"){
                        statusCount.push(data[i].status)
                        while(count == 1){
                            console.log(`${chalk.bold(`Listing tasks by `)}${chalk.yellow.bold(`(status: in-progress)`)}:`)
                            count ++
                        }
                        console.log(`${chalk.bold(`${index}. ${data[i].description}`)} ${chalk.blue.bold(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                }
                if(statusCount.length == 0){
                    console.log(chalk.bold("No tasks found"))
            }
            }
            else if (status == "todo"){
                let index = 1
                let count = 1 
                let statusCount = []
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "todo"){
                        statusCount.push(data[i].status)
                        while(count == 1){
                            console.log(`${chalk.bold(`Listing tasks by `)}${chalk.red.bold(`(status: todo)`)}:`)
                            count ++
                        }
                        console.log(`${chalk.bold(`${index}. ${data[i].description}`)} ${chalk.blue.bold(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                }
                if(statusCount.length == 0){
                    console.log(chalk.bold("No tasks found"))
            }
            }
            else{
                console.log(`${chalk.bold.red(`No such status exists. Did you mean 'done', 'in-progress', or 'todo'? `)}`)
            }
            }
        )
program.parse(process.argv)

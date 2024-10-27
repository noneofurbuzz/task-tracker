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
    .command('add <description>')
    .description('Add a task')
    .action((description) => {
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
    })
program
    .command('delete <id>')
    .description('Delete a task')
    .action((id) => {
        let data = taskManager.readFile()
        let deleteTask = data.filter((task) => task.id != id)
        let updatedTaskList = deleteTask.map((task) => {
            task.id = deleteTask.indexOf(task) + 1               
        }
        )
        if (deleteTask.length >= id){
            deleteTask = JSON.stringify(deleteTask,null,5)
            fs.writeFileSync('tasks.json',deleteTask,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543').bold("Task deleted successfully"))
        }
        else{
            console.log(chalk.red.bold(`No such (ID: ${id}) exists. No tasks deleted`))
        }
        })
program
        .command('update <id> <description>')
        .description('Update a task')
        .action((id,description) => {
            let data = taskManager.readFile()
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
            

        })
program
        .command('mark-done <id>')
        .description("Mark a task as done")
        .action((id) => {
            let data = taskManager.readFile()
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
        })
program
        .command('mark-in-progress <id>')
        .description("Mark a task as in progress")
        .action((id) => {
            let data = taskManager.readFile()
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
        })
program
        .command('list [status]')
        .description("List all tasks or list tasks by status")
        .action((status) => {
            let data = taskManager.readFile()
            if (status == null){
                for (let i = 0;i < data.length;i = i + 1){
                console.log(`${chalk.bold(`${data[i].id}. ${data[i].description}`)} ${data[i].status == "in-progress" ? chalk.yellow.bold(`(status: ${data[i].status})`) : (data[i].status == "done" ? chalk.hex('4bb543').bold(`(status: ${data[i].status})`) : chalk.red.bold(`(status: ${data[i].status})`)) } ${chalk.blue.bold(`[ID: ${data[i].id}]`)}`)
                }
            }
            else if (status == "done"){
                let index = 1
                console.log(`${chalk.bold(`Listing tasks by `)}${chalk.hex('4bb543').bold(`(status: done)`)}:`)
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "done"){
                        console.log(`${chalk.bold(`${index}. ${data[i].description}`)} ${chalk.blue.bold(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                }}
            else if (status == "in-progress"){
                let index = 1
                console.log(`${chalk.bold(`Listing tasks by `)}${chalk.yellow.bold(`(status: in-progress)`)}:`)
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "in-progress"){
                        console.log(`${chalk.bold(`${index}. ${data[i].description}`)} ${chalk.blue.bold(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                }}
            else if (status == "todo"){
                let index = 1
                console.log(`${chalk.bold(`Listing tasks by `)}${chalk.red.bold(`(status: todo)`)}:`)
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "todo"){
                        console.log(`${chalk.bold(`${index}. ${data[i].description}`)} ${chalk.blue.bold(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                }}
            else{
                console.log(`${chalk.bold.red(`No such status exists. Did you mean 'done', 'in-progress', or 'todo'? `)}`)
            }
            }
        )
program.parse(process.argv)

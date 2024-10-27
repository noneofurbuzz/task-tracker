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
        .command('update <id> [description]')
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

program.parse(process.argv)

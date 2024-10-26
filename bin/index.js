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
        deleteTask = JSON.stringify(deleteTask,null,5)
        fs.writeFileSync('tasks.json',deleteTask,(err) => {
            if (err) throw err
        })
        console.log(chalk.hex('#4bb543').bold("Task deleted successfully"))
        })
        
    
program.parse(process.argv)

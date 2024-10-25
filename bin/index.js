#!/usr/bin/env node

const taskManager = require('../index.js')
const fs = require('fs')
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
    })
program.parse(process.argv)

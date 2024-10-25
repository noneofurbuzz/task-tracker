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
        let test = taskManager.addTask()
        test.description = description
        test.id = (data.length) + 1
        data.push(test)
        data = JSON.stringify(data)
        fs.writeFileSync('tasks.json',data,(err) => {
            if (err) throw err
        })
    })
program.parse(process.argv)
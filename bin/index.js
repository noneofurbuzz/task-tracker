#!/usr/bin/env node

const taskManager = require('../index.js')
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
        taskManager.addTask(
        )
    })
program.parse(process.argv)
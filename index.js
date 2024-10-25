const fs = require('fs')

function writeFile(){
    fs.writeFile('tasks.json',(err) => {
        if (err) throw err
    })
}
function readFile(){
    const data = fs.readFile('tasks.json',(err) => {
        if (err) throw err
    })
    jsondata = JSON.parse(data)
}
function addTask(){
    readFile()
    taskProperty = {
        id: id,
        description: description,
        status: status,
        createdAt: createdAt,
        updatedAt: UpdatedAt
    } 
}
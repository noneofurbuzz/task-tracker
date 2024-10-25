const fs = require('fs')

function writeFile(){
    fs.writeFileSync('tasks.json','',(err) => {
        if (err) throw err
    })
    
}
function readFile(){
    if (fs.existsSync('tasks.json')){
        const data = fs.readFileSync('tasks.json',(err) => {
            if (err) throw err
        })
        jsondata = JSON.parse(data)
    }
    else{
        writeFile()
    }

}
function addTask(){
    readFile()
    for (let id = 0; id >= 1; id ++){
        let taskProperty = {
            id: id + 1 ,
            description: description,
            status: status,
            createdAt: createdAt,
            updatedAt: UpdatedAt
        } 
    }

}
module.exports = {addTask}
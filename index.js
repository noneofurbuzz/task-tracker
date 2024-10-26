const fs = require('fs')
function writeFile(){
    fs.writeFileSync('tasks.json',"[]" ,(err) => {
        if (err) throw err}
    )    
}

function readFile(){
    if (fs.existsSync('tasks.json')){
        const data = fs.readFileSync('tasks.json',(err) => {
            if (err) throw err
        }) 
        return JSON.parse(data)
    }
    else{
       writeFile()
       return JSON.parse('[]')
    }

}
function addTask(){
    readFile()
    for (i = 0;i <= 0;i++){

    }
    let taskProperty = {
        id: 1,
        description: "",
        status: "todo",
        createdAt: new Date(),
        updatedAt: ""
    } 
        return taskProperty
}
/*function deleteTask(){
    let data = readFile()
    let test = data.map((task) => task.id = )
    
}*/
module.exports = {addTask,readFile}
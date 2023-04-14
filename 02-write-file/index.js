const fs = require('fs')
const path = require('path')
const readline = require("readline");

const fileName = path.join(__dirname, 'newtext.txt')
const writeFile = fs.createWriteStream(fileName)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Добро пожаловать на курсы по записи, что добавить в файл? \n Для завершения наберите 'exit' или нажмите 'ctrl+C'.");
rl.prompt()
rl.on('line', (userInput) => {
    if(userInput.trim() === 'exit') {
        rl.close()
    } else {
        writeFile.write(userInput+'\n')
    }
})
function handelError() {
    console.log('Error!')
    writeFile.write("...Finished with error")
}
rl.on('error', err => handelError())

rl.on('close', ()=>{
    console.log('Спасибо! Завершение ввода.')
})

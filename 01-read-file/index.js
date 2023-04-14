const fs = require("fs");
const path = require("path");
const pathText = path.join(__dirname, "text.txt")
const stream = new fs.createReadStream(pathText)

stream.on('data', (text) => {
    console.log(text.toString());
})

stream.on('end', () => {
    console.log('End!');
})

stream.on('error', (err) => {
    if(err.code === 'ENOENT') {
        console.log('Нет файла!')
    } else {
        console.error(err)
    }
})
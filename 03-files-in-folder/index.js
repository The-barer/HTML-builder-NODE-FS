const fs = require('fs')
const path = require('path')
const rootPath = path.join(__dirname, 'secret-folder')

readAllFiles(rootPath)

function readAllFiles(startPath) {
    fs.readdir(startPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            throw err
        }
        for (let file of files) {
            if(file.isDirectory()) {
                const newPath = path.join(startPath,file.name)
                readAllFiles(newPath)
            } 
            else if(file.isFile()) {
                const filePath = path.join(startPath, file.name)
                fs.stat(filePath, (err, stats) => {
                    if(err) {
                        if(err === 'ENOENT'){
                          return console.log('Файл не найден');
                        } else {
                            throw err
                        }
                    }
                    const obj = path.parse(filePath)
                    if(!(obj.ext === "" || stats.size === 0)){
                        console.log(`${obj.name} -- ${obj.ext.substring(1)} -- ${(stats.size/1024).toFixed(3)}kb`)
                    }
                })
            }
        }
    })
}

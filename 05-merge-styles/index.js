const fs = require('fs')
const path = require('path')

const styleStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
const stylePath = path.join(__dirname, 'styles')



mergeStyles(stylePath)


function mergeStyles(startPath) {
    fs.readdir(startPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            throw err
        }
        for (let file of files) {
            const filePath = path.join(startPath, file.name)
            if(file.isDirectory()) {
                return
            } 
            else if(path.extname(filePath) === '.css') {
                fs.readFile(filePath,'utf-8',(err, data) => {
                    if(err) {
                        throw err
                    }
                    styleStream.write(data+'\n')
                })
            }
        }
    })   
}


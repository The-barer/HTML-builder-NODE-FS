const fs = require("fs")
const path = require("path")
const pathToCopy = path.join(__dirname, 'files')

copyFiles(pathToCopy, pathToCopy+'-copy')

function copyFiles(startPath, destPath) {
    fs.rm(destPath, {recursive: true}, () => {
        fs.mkdir(destPath, {recursive: true}, () => {})
        fs.readdir(startPath, { withFileTypes: true }, (err, files) => {
            if (err) {
                throw err
            }
            for (let file of files) {
                const origfilePath = path.join(startPath, file.name)
                const destFilePath = path.join(destPath, file.name)
                if(file.isDirectory()) {
                    copyFiles(origfilePath, destFilePath)
                } 
                else if(file.isFile()) {
                    fs.copyFile(origfilePath, destFilePath, ()=> {})
                }
            }
        })
    })
}



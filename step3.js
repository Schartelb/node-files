const fs = require('fs')
const axios = require('axios')
const { stringify } = require('querystring')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error: ", err)
            process.kill(1)
        }
        console.log("cat(data)="+data)
        return (data)
    })
}

function webCat(url) {
    readURL(url)
        .then((resp) => {
            return (resp.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

async function readURL(url) {
    return await axios.get(url)
}


function argCheck(arg) {
    String(arg)
    if (arg.includes('://')) {
        const data=webCat(arg)
        console.log(data)
    }
    else {
        const data = cat(arg)
        console.log(data)
    }
}

function writeToFile() {
    fs.writeFile(process.argv[4],)
}

function printOrFile(arg) {
    if (arg.includes("--out")) {
        writeToFile()
    }
    else { argCheck(arg) }
}

printOrFile(process.argv[2])
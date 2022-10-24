const fs = require('fs')
const axios = require('axios')
const { stringify } = require('querystring')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error: ", err)
            process.kill(1)
        }
        console.log(`cat ${data}`)
        return data
    })
}

function webCat(url) {
    readURL(url)
        .then((resp) => {
            console.log(`webCat ${resp.url}`)
            return resp.data
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
        const data = webCat(arg)
        console.log(`argCheck web ${String(data)}`)
    }
    else {
        const data = cat(arg)
        console.log(`argCheck file ${String(data)}`)
    }
}

function argCheckWrite(arg) {
    String(arg)
    if (arg.includes('://')) {
        const data = webCat(arg)
        console.log(`argCheckWrite web ${data}`)
        return String(data)
    }
    else {
        const data = cat(arg)
        console.log(`argCheckWrite file ${data} `)
        return String(data)
    }
}

function writeToFile() {
    console.log('writeToFile')
    fs.writeFile(argv[3], argCheckWrite(argv[4]), 'utf8', (err) => {
        if (err) {
            console.log("Error:", err)
        }
        console.log("Wrote to file!")
    })
}

function printOrFile(arg) {
    if (arg.includes("--out")) {
        writeToFile()
    }
    else { argCheck(arg) }
}

const argv = process.argv
console.log(argv)
printOrFile(argv[2])
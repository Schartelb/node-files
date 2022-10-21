const fs = require('fs')
const axios = require('axios')
const { stringify } = require('querystring')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error: ", err)
            process.kill(1)
        }
        console.log(data)
    })
}

function webCat(url) {
    readURL(url)
        .then((resp) => {
            console.log(resp.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

function argCheck(arg) {
    String(arg)
    if (arg.includes('://')) {
        webCat(arg)
    }
    else {
        cat(arg)
    }
}

async function readURL(url) {
    return await axios.get(url)
}

argCheck(process.argv[2])
const http = require('http')
const fs = require('fs')
const https = require('https')

let url = new URL('https://coderbyte.com/api/challenges/json/json-cleaning')

myRequest = https.get(url, (res) =>{
    res.setEncoding('utf8')
    let data = ''
    res.on('data', (chunk) =>{
        data += chunk
    })
    res.on('end', () => {
        data = JSON.parse(data);
        
        Object.keys(data).forEach((key) =>{
            if(data[key].constructor === Object || data[key]){
                if (data[key]['middle'] === '')
                    delete data[key]['middle']
                if (data[key]['highschool'] === 'N/A'){
                    delete data[key]['highschool']
                }
            }
            if (data[key].constructor === Array){
                data[key].splice(-1)
            }
            if (data[key] === '-'){
                delete data[key]
            }
        })
        json = JSON.stringify(data)
       fs.writeFile('json-cleaner.json', json, (err) =>{
           if (err) console.log(err);
           else{
               console.log('File Created')
           }
       })
    })
})
// dependencies 
const fs = require('fs')
const path = require('path')

//module scaffolding 
const lib = {}
lib.basedir = path.join(__dirname,'./../data/')

// write data to file 
lib.create = (dir,file,data,callback) => {
  fs.open(lib.basedir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data)

      fs.writeFile(fileDescriptor,stringData,(err)=>{
        if(!err){
          fs.close(fileDescriptor,(err)=>{
            if (!err) {
              callback(false)
            }else{
              callback("Error closing new file!")
            }
          })
        }else{
          callback('File Couldn\'t write')
        }
      })
    }else{
      callback(err)
    }
  })
}

lib.read = (dir,file,callback) => {
  fs.readFile(`${lib.basedir+dir}/${file}.json`,'utf-8',(err,data)=>{
    callback(err,data)
  })
}


module.exports = lib

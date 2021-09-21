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

//read data to file
lib.read = (dir,file,callback) => {
  fs.readFile(`${lib.basedir+dir}/${file}.json`,'utf-8',(err,data)=>{
    callback(err,data)
  })
}

//update file 

lib.update = (dir,file,data,callback) => {
  fs.open(`${lib.basedir+dir}/${file}.json`,'r+',(err,fileDescriptor)=>{
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data)
      // truncate the file 
      fs.ftruncate(fileDescriptor,(err)=>{
        if(!err){
          fs.writeFile(fileDescriptor,stringData,(err)=>{
            if(!err){
              fs.close(fileDescriptor,(err)=>{
                if(!err){
                  callback(false)
                }else{
                  callback('Error writing file')
                }
              })
            }else{
              console.log('File couldn\'t write');
            }
          })
        }else{
          console.log(err);
        }
      })
    }else{
      console.log('File couldn\'t update');
    }
  })
}

lib.delete = (dir,file,callback) => {
  fs.unlink(`${lib.basedir+dir}/${file}.json`,(err)=>{
    if (!err) {
      callback(false)
    }else{
      callback('Couldn\'t Unlink')
    }
  })
}

lib.list = (dir,callback) => {
  fs.readdir(`${lib.basedir+dir}`,(err,fileLists)=>{
    if(!err && fileLists && fileLists.length > 0){
      let trimmedFileNames = []
      fileLists.forEach(name=>{
        trimmedFileNames.push(name.replace('.json',''))
      })
      callback(false,trimmedFileNames)
    }else{
      callback('Error Reading Directory')
    }

  })
}

lib.collection = (dir,callback) => {
  fs.readdir(`${lib.basedir+dir}`,(err,fileLists)=>{
    if(!err && fileLists && fileLists.length > 0){
      let trimmedFileNames = []
      fileLists.forEach(name=>{
        trimmedFileNames.push(name.replace('.json',''))
      })
      let collection = []
      trimmedFileNames.forEach(el=>{
        collection.push(fs.readFileSync(`${lib.basedir+'check'}/${el}.json`,'utf-8'))
      })
      callback(false,collection)
    }else{
      callback('Error Reading Directory')
    }

  })
}


module.exports = lib

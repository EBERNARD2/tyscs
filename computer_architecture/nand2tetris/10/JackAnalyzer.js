const fs = require('node:fs');

/* 
  First, we need to determine if command line argument 2 is a jack file or directory


  If directory, process file one file at a time


  If jack file, process file


  test would be to output data in Jack tokenizer

*/




/** 
 *  There are a few requirements we need to consider for this function:
 * 1. We know a inputFilePath is a file if it ends with .{file extension}
 * - If it is not a jack file there is not point of analyzing syntax in file as this is a Jack compiler
 * 2. If it does not have a file extension we can assume that it is a path to a directory// 
 * - POSIX should throw an error the dir doesn't exist
*/



// ./Path/To/File.js or /Usr/name/folder/here/file.js

// Determine whether or not input string is a directory

const getJackFiles = (inputFilePath) => {

  // Break string up where instances of char "." occur in string
  const splitPath = inputFilePath.split(".");

  // Determine whether or not the input is a file path or directory 
  // need to account for both relative and absolute paths
  const isDir = `.${splitPath[1]}` === inputFilePath || splitPath[0] === inputFilePath;
  if (!isDir){
    // if it is a file then make sure it is a jack file
    const validFile = splitPath[splitPath.length - 1] === "jack";

    if (!validFile){
      console.error('Must enter a valid jack file extension');
      process.exit(1);
    }

    console.log('Valid jack file');
    // if it is not a jack file throw an error and exit program
     
  } else {
    // If not a file path try to fetch directory
    try {
      const dir = fs.readdirSync(inputFilePath);

      // if successful log out all files in directory
      for(const file of dir){
        console.log(file);
      }

    } catch(err){
      // if not a valid directory on machine throw an error 

      console.error(`Error: Not a valid file path`);
      console.error(err);
      process.exit(1);
    }

  }
 
};



getJackFiles(process.argv[2]);








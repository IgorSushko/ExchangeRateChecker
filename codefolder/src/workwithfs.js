const fs = require('fs');


/**
 * @param {void} 
 * @returns {object} return array of JSON strings
 */
module.exports.readFromContent = () => {
    try{ 
    var contents = JSON.parse(fs.readFileSync(`${process.env.FILES_ROOT_FOLDER}/contentlist/lp124full.txt`, 'utf8'));
    }
    catch (error) {
      console.log('Readfile error: ', error);
      return {};
    }
    return contents;
}

/**
 * @param {string} Page url
 * @param {object} Array of results
 * @param {string} time of start test
 * @returns {void} Write data to file
 */
module.exports.writetoReportContent = (pagename,findresult,currentTime) => {
  
  
  const currentTimeusr = new Date(Date.now()).toLocaleString();
  const filepath = `${process.env.FILES_ROOT_FOLDER}/report/${currentTime}.txt`;
  try {
    fs.appendFileSync(filepath, `***********************************${currentTimeusr}************************************\n`);
    fs.appendFileSync(filepath,`${pagename}\n`);
    for (const fo of findresult) {
      fs.appendFileSync(filepath,`${fo}\n`);
    }
    
  }
  catch (err){
    console.log('Error during write to file: ',err)
  }
}

/**
 * @param {string} Path to report file
 * @returns {bool} File exist or not
 */
module.exports.checkReportContent = (filepath) => {

  try{
      return fs.statSync(filepath).isFile();
  } catch (err1) {

    console.log('Error during check file: ', err1)
    return false;
    
  }

}
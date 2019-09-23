/**
 * @param {str} url of bank  
 * @param {int} 
 * @param {int} 
 * @param {int}
 * @param {int}    
 * @returns {object} return JS object
 */
module.exports.createBankDetails = (bank,dollarsell,dollarbuy,evrosell,evrobuy,timestamp) => {
    try{ 

        var objBank = {};
            objBank.bank = bank;
            objBank.dollar = {};
            objBank.dollar.sell = dollarsell;
            objBank.dollar.buy = dollarbuy;
            objBank.evro = {};
            objBank.evro.sell = evrosell;
            objBank.evro.buy = evrobuy;
            objBank.date = timestamp;   
    }
    catch (error) {
      console.log('Error: ', error);
      return {};
    }
    return objBank;
}
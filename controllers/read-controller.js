const readModel = require('../models/read-model');

function caesarCipherDecrypt(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(((charCode - 65 - key + 26) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(((charCode - 97 - key + 26) % 26) + 97);
    } else {
      result += text[i];
    }
  }
  return result;
}

module.exports = {
  readData: function(req, res) {
    readModel.readData(function(data) {
      // Decrypting fetched data before rendering the view
      const decryptedData = data.map(item => {
        return {
          id: item.id,
          full_name: caesarCipherDecrypt(item.full_name, 21),
          email_address: caesarCipherDecrypt(item.email_address, 21),
          city: caesarCipherDecrypt(item.city, 21),
          country: caesarCipherDecrypt(item.country, 21)
        };
      });

      res.render('crud-table', { fetchData: decryptedData });
    });
  }
};

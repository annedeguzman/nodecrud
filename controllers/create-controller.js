const createModel = require('../models/create-model');

function caesarCipherEncrypt(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(((charCode - 65 + key) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(((charCode - 97 + key) % 26) + 97);
    } else {
      result += text[i];
    }
  }
  return result;
}

module.exports = {
  crudForm: function(req, res) {
    res.render('crud-form');
  },
  createData: function(req, res) {
    const inputData = {
      full_name: caesarCipherEncrypt(req.body.full_name, 21),
      email_address: caesarCipherEncrypt(req.body.email_address, 21),
      city: caesarCipherEncrypt(req.body.city, 21),
      country: caesarCipherEncrypt(req.body.country, 21)
    };

    createModel.createData(inputData, function(data) {
      console.log(data.affectedRows + " record created");
      res.redirect('/crud/read'); // Redirect to the page where data is viewed
    });
  }
};
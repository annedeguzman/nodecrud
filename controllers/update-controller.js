const updateModel = require('../models/update-model');

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
  editData: function(req, res) {
    const editId = req.params.id;
    updateModel.editData(editId, function(data) {
      // Decrypting data before rendering the edit form
      const decryptedData = {
        id: data.id,
        full_name: caesarCipherDecrypt(data.full_name, 21),
        email_address: caesarCipherDecrypt(data.email_address, 21),
        city: caesarCipherDecrypt(data.city, 21),
        country: caesarCipherDecrypt(data.country, 21)
      };
      res.render('crud-form', { editData: decryptedData });
      console.log(data.affectedRows + " record fetched");
    });
  },
  updateData: function(req, res) {
    const inputData = { 
      id: req.params.id,
      full_name: caesarCipherEncrypt(req.body.full_name, 21), 
      email_address: caesarCipherEncrypt(req.body.email_address, 21), 
      city: caesarCipherEncrypt(req.body.city, 21), 
      country: caesarCipherEncrypt(req.body.country, 21) 
    }; 
    
    const updateId = req.params.id;
    updateModel.updateData(inputData, updateId, function(data) {
      res.redirect('/crud/read');
      console.log(data.affectedRows + " record(s) updated");
    }); 
  }
};
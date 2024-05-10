var createModel=require('../models/create-model');

function caesarCipher(key, text) {
  const shift = key % 26; // Ensure the key is within the alphabet range
  let output = '';

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    // Check if the character is a letter
    if (char.match(/[a-z]/i)) {
      // Get its code
      let code = text.charCodeAt(i);

      // Uppercase letters
      if ((code >= 65) && (code <= 90)) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Lowercase letters
      else if ((code >= 97) && (code <= 122)) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }

    // Append the encrypted character to the output
    output += char;
  }

  return output;
}

module.exports={
crudForm:function(req, res) {
    res.render('crud-form');
},

createData:function(req,res){
  const inputData= {
    full_name:     caesarCipher(9, req.body.full_name,),
    email_address: req.body.email_address,
    city :         req.body.city,
    country :      req.body.country
  };
createModel.createData(inputData,function(data){
      res.redirect('/crud/form');
      console.log(data.affectedRows + " record created");
    });
}

}
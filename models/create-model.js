var db=require('../database');
module.exports={ 
  createData:function(inputData,callback){
    var sql = 'INSERT INTO crud SET ?'; 
    db.query(sql, inputData,function (err, data) {
    if (err) throw err;
      return callback(data);
    });
  }
}
var MongoClinent = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin123@ihm-8bhop.mongodb.net/test?retryWrites=true&w=majority"

MongoClinent.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err,db)=>{
    if(err) throw err;
    var dbo = db.db("Jay")
    dbo.collection("Details").findOne({},(err,result)=>{
        if(err) throw err
        console.log(result);
        db.close();
        
    })
})
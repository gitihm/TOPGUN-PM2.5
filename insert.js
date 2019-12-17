var MongoClinent = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin123@ihm-8bhop.mongodb.net/test?retryWrites=true&w=majority"

MongoClinent.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err,db)=>{
    if(err) throw err;
    var dbo =db.db("Jay")
    var newItem = { title : "01" , year : 2019}
    dbo.collection("Details").insertOne(newItem,(err,res)=>{
        if(err) throw err
        console.log("inserted");
        db.close()
        
    })
})
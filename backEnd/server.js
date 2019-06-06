const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const async = require('async');
const app = express();
const csv = require('csv-array');
const file =  require('./moduleFunctions.js')

var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');


var url = "mongodb://localhost:27017/shopsite";



// let __dirname = "C:\Users\macov\Desktop\Licenta"

// app.use(express.static(__dirname));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Content-Type', 'application/json')

    // Pass to next layer of middleware
    next();

    // res.end();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(8000, ()=>{
console.log('Server started');
})


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Cucurigu12',
  database : 'shopsite'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});






app.post("/register",function(req,res){
  let password = req.body.Password;
  let email = req.body.Email;

  if (password.trim().length != 0 && email.trim().length != 0){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbs = db.db("shopsite");
      let reviewerID = file.randomer();
      dbs.collection("users").insertOne({'password':password,'username':email,'reviewerID':reviewerID},function(err, result) {
        if (err) throw err;
        console.log(result,'registered 1 user')
      });
      
    });
  }
})


app.post("/recommendedItems",function(req,res){
  let array = req.body.array;
  console.log(array,'ciprian macovei');
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("items").find({'asin' : {$in : array}}).toArray(function(err,result) {
      if (err) throw err;
      console.log(result,'macovei ciprian')
      res.json({
        items:result
      })
    });
  });
});



app.post("/login",function(req,res){
  let password = req.body.Password;
  let email = req.body.Email;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("users").find({'password':password,'username':email}).toArray(function(err,result) {
      if (err) throw err;
      if (result.length != 0){
        res.json({
          ok:true,
          user:email,
          reviewerID:result[0].reviewerID
        })
      }
      else res.json({
        ok:false
       })
    });
    
  });
})




app.post("/rateItem/:id",function(req,res){


let id = req.params.id;
let rate = JSON.parse(Object.keys(req.body)).rate;
    rate = Number(rate);  
    console.log(rate, 'adasdsadas');
  
   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("reviews").update({'asin':id},{$set:{'overall':rate}},function(err, result) {
      if (err) throw err;
      console.log('item has been rated')
      res.send(true);
    });
    
  });  


})


app.get("/home",function(req,res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("items").find({}).limit(100).toArray(function(err, result) {
      if (err) throw err;
      res.json({data : result});
    });
    
  });
})




app.get("/home/tv",function(req,res){

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("items").find({"category":{$elemMatch:{$elemMatch:{$in:["TV Ceiling & Wall Mounts","LED TVs","External TV Tuners","Internal TV Tuner & Capture Cards","TV Antennas","Satellite TV Equipment","TV Remote Controls"]}}}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'hai in pula mea');
      res.json({data : result});
    });
    
  });

})



app.get("/home/video", function(req,res){




    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("items").find({"category":{$elemMatch:{$elemMatch:{$in:["Professional Video Accessories","Video Surveillance","On-Camera Video Lights","On-Dash Video","Car Video","Video","Sports & Action Video Cameras"]}}}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'hai in pula mea');
      res.json({data : result});
    });
    
  });

})



app.get("/home/audio", function(req,res){

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("items").find({"category":{$elemMatch:{$elemMatch:{$in:["Car Audio","Home Audio","Audio Cables","Headphones","Computer Speakers","Speaker Cables","Speakers"]}}}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'hai in pula mea');
      res.json({data : result});
    });
    
  });

})



app.get("/home/network", function(req,res){

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("items").find({"category":{$elemMatch:{$elemMatch:{$in:["Network Attached Storage","Bluetooth Network Adapters","Powerline Network Adapters","Laptop Network Adapters","Network Adapters","Networking Products","Switches","Routers"]}}}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'hai in pula mea');
      res.json({data : result});
    });
    
  });

})



// fa in monog !!
app.post("/changePassword",function(req,res){

let id = req.body.id;
let pass = req.body.pass


console.log(id,pass)


})


app.post("/showPassword",function(req,res){
  console.log(req.body);
  let id = req.body.id;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("users").find({"reviewerID":id}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'hai in pula mea');
      res.json({data : result});
    });
    
  });




});




app.post('/getPass',function(req,res){

  let email = JSON.parse(Object.keys(req.body)[0]).pass;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("users").find({"username":email}).toArray(function(err, result) {
      if (err) throw err;
      res.json({data : result});
    });
    
  });


})





app.get("/home/:start/:end",function(req,res){

  let start = req.params.start;
  let end = req.params.end;
  start = Number(start.slice(1));
  end = Number(end.slice(1));


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("items").find({}).skip(start).limit(end).toArray(function(err, result) {
      if (err) throw err;
      res.json({data : result});
    });
    
  });

})


app.get("/itemDetails/:id",function(req,res){
  
  let id = req.params.id;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");

    function Item(id,callback){
      dbs.collection("items",function(err,collection){
        collection.find({asin:id}).toArray(callback);
      });
    }
    function Reviews(id,callback){
      dbs.collection("reviews",function(err,collection){
        collection.find({asin:id}).sort({_id:-1}).limit(3).toArray(callback);
      });
    }
    
  
    async.parallel({
      item:async.apply(Item,id),
      reviews:async.apply(Reviews,id)
      },function(error,results){
        if (error) throw error;
        results.item.reviews = results.reviews;
        console.log(results.item);
        res.send(results);
    });
  });

 

})





app.post("/itemDetails/:id",function(req,res){
  

  let reviewerName = JSON.parse(Object.keys(req.body)[0]).reviewerName;
  let text = JSON.parse(Object.keys(req.body)[0]).reviewText;
  let reviewerID = JSON.parse(Object.keys(req.body)[0]).reviewerID;
  let id = req.params.id;
  let datenow = file.dateNowFormat();

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("reviews").insertOne({'reviewerID':reviewerID,'asin':id,'summary':text,'reviewTime':datenow,'reviewerName':reviewerName},function(err, result) {
        if (err) throw err;
        console.log(result,'commented +1')
      });
    dbs.collection("boughItems").insertOne()
    
  });
})



app.post("/boughItems", function(req,res){


  let nume = JSON.parse(Object.keys(req.body)[0]).nume;
  let imagine = JSON.parse(Object.keys(req.body)[0]).imagine;


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("boughItems").insertOne({nume,imagine},function(err, result) {
        if (err) throw err;
        console.log(result,'boughItems +1')
      });
    
  });

})


app.get("/search=:nume",function(req,res){

  let numeProdus = req.params.nume;
  
   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    dbs.collection("items").find({$text:{$search:numeProdus}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'ciprian')
      res.json({data : result});
    });
    
  });

})

app.post("/buyItems",function(req,res){
  // let id = req.params.id;
  console.log(req.body)

  let buyArray = Object.keys(req.body);
  buyArray = buyArray[0].split(',');
  console.log(buyArray[0])

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbs = db.db("shopsite");
    for (i=0;i<buyArray.length;i++){
      buyArray[i] = (buyArray[i].replace('"','')).replace('"','');
      console.log(buyArray[i])
      dbs.collection("items").update({"nume":buyArray[i]},{"$inc": { "number": -1 } },function(err, doc) {
      if (err) throw err;
      console.log(doc.result.n,'puchase')
    });
    }
  });

})



app.get("/home/autoMoto",function(req,res){


  //   connection.query('select * from items',function(err,rows,fields){
  //   if(!err){
      
  //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
  //     res.json({data : rows});
  //   }
  //   if(err){
  //     console.log(err);
  //   }
  // })
  connection.query(`select * from itemsoferte`,function (err,rows,fields){
    if (!err){
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",rows);
      res.json({itemsoferte:rows})
     
    }
    if (err){
      console.log(err);
    }

    
  })
})
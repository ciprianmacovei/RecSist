const express = require('express');
const db = require('./mongoUtil');
const bodyParser = require('body-parser');
const async = require('async');
const file =  require('./moduleFunctions.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});


db.connect(() => {

  app.get("/home",function(req,res){
    db.get().collection("items").find({}).limit(100).toArray(function(err, result) {
      if (err) throw err;
      res.json({data : result});
    });

  });


  app.post("/register",function(req,res){
    let password = req.body.Password,
    email = req.body.Email,
    reviewerID = file.randomer();
        db.get().collection("users").insertOne({'password':password,'username':email,'reviewerID':reviewerID},function(err, result) {
          if (err) throw err;
        });
  });


  app.post("/recommendedItems",function(req,res){
    let array = req.body.array;
      db.get().collection("items").find({'asin' : {$in : array}}).toArray(function(err,result) {
        if (err) throw err;
        res.json({
          items:result
        })
      });
  });


  app.post("/login",function(req,res){
    let password = req.body.Password;
    let email = req.body.Email;
    db.get().collection("users").find({'password':password,'username':email}).toArray(function(err,result) {
      if (err) throw err;
      if (result){
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


  app.post("/rateItem/:id",function(req,res){
    let id = req.params.id;
    let rate = JSON.parse(Object.keys(req.body)).rate;
    rate = Number(rate);
      db.get().collection("reviews").update({'asin':id},{$set:{'overall':rate}},function(err, result) {
        if (err) throw err;
        res.send(true);
      });
  });


  app.get("/home/tv",function(req,res){
    db.get().collection("items").find({"category":{$elemMatch:{$elemMatch:{$in:["TV Ceiling & Wall Mounts","LED TVs","External TV Tuners","Internal TV Tuner & Capture Cards","TV Antennas","Satellite TV Equipment","TV Remote Controls"]}}}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      res.json({data : result});
    });
  });


  app.get("/home/video", function(req,res){
    db.get().collection("items").find({"category":{$elemMatch:{$elemMatch:{$in:["Professional Video Accessories","Video Surveillance","On-Camera Video Lights","On-Dash Video","Car Video","Video","Sports & Action Video Cameras"]}}}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'hai in pula mea');
      res.json({data : result});
    });
  });


  app.get("/home/audio", function(req,res){
    db.get().collection("items").find({"category":{$elemMatch:{$elemMatch:{$in:["Car Audio","Home Audio","Audio Cables","Headphones","Computer Speakers","Speaker Cables","Speakers"]}}}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'hai in pula mea');
      res.json({data : result});
    });
  });


  app.get("/home/network", function(req,res){
    db.get().collection("items").find({"category":{$elemMatch:{$elemMatch:{$in:["Network Attached Storage","Bluetooth Network Adapters","Powerline Network Adapters","Laptop Network Adapters","Network Adapters","Networking Products","Switches","Routers"]}}}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'hai in pula mea');
      res.json({data : result});
    });
  });


  app.post("/showPassword",function(req,res){
    console.log(req.body);
    let id = req.body.id;
    db.get().collection("users").find({"reviewerID":id}).toArray(function(err, result) {
      if (err) throw err;
      res.json({data : result});
    });
  });


  app.post('/getPass',function(req,res){
    let email = JSON.parse(Object.keys(req.body)[0]).pass;
    db.get().collection("users").find({"username":email}).toArray(function(err, result) {
      if (err) throw err;
      res.json({data : result});
    });
  });


  app.get("/home/:start/:end",function(req,res){
    let start = req.params.start,
        end = req.params.end;
    start = Number(start.slice(1));
    end = Number(end.slice(1));
    db.get().collection("items").find({}).skip(start).limit(end).toArray(function(err, result) {
      if (err) throw err;
      res.json({data : result});
    });
  });


  app.get("/itemDetails/:id",function(req,res){
    let id = req.params.id;
    function Item(id,callback){
      db.get().collection("items",function(err,collection){
        collection.find({asin:id}).toArray(callback);
      });
    }
    function Reviews(id,callback){
      db.get().collection("reviews",function(err,collection){
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


  app.post("/itemDetails/:id",function(req,res){
    let reviewerName = JSON.parse(Object.keys(req.body)[0]).reviewerName,
        text = JSON.parse(Object.keys(req.body)[0]).reviewText,
        reviewerID = JSON.parse(Object.keys(req.body)[0]).reviewerID,
        id = req.params.id,
        datenow = file.dateNowFormat();
    db.get().collection("reviews").insertOne({'reviewerID':reviewerID,'asin':id,'summary':text,'reviewTime':datenow,'reviewerName':reviewerName},function(err, result) {
      if (err) throw err;
    });
  });


  app.post("/boughItems", function(req,res){
    let nume = JSON.parse(Object.keys(req.body)[0]).nume,
        imagine = JSON.parse(Object.keys(req.body)[0]).imagine;
    db.get().collection("boughItems").insertOne({nume,imagine},function(err, result) {
      if (err) throw err;
      console.log(result,'boughItems +1')
    });
  });


  app.get("/search=:nume",function(req,res){
    let numeProdus = req.params.nume;
    db.get().collection("items").find({$text:{$search:numeProdus}}).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result,'ciprian')
      res.json({data : result});
    });
  });


  app.post("/buyItems",function(req,res){
    let buyArray = Object.keys(req.body);
    buyArray = buyArray[0].split(',');
    for (i=0;i<buyArray.length;i++){
      buyArray[i] = (buyArray[i].replace('"','')).replace('"','');
      db.get().collection("items").update({"nume":buyArray[i]},{"$inc": { "number": -1 } },function(err, doc) {
        if (err) throw err;
      });
    }
  });

  app.listen(8000, ()=>{
    console.log('Server started');
  })
});



// fa in monog !!
app.post("/changePassword",function(req,res){

let id = req.body.id;
let pass = req.body.pass;


console.log(id,pass)


});

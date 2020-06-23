const express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;


var url = 'mongodb+srv://luongdeptrai:12345@cluster0-geajk.mongodb.net/test';

router.get('/', async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("Product"); 
    let results = await dbo.collection("toy").find({}).toArray();
    res.render('allproduct', { product: results });
})


///---------------------------Insert Toy---------------------------------------

router.get('/insert', (req, res) => {
    res.render('insert');
})
router.post('/insert', async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("Product");
    let name = req.body.name;
    let type = req.body.type;
    let price = req.body.price;
    let newproduct = {
        name: name,
        type: type,
        price: price
    };
    await dbo.collection("toy").insertOne(newproduct);

    let results = await dbo.collection("toy").find({}).toArray();
    res.render('allproduct', { product: results });
});


/// --------------------------Edit Toy-----------------------------------------
router.get('/product/edit', async(req,res)=>{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;

    let client= await MongoClient.connect(url);
    let dbo = client.db("Product");
    let result = await dbo.collection("toy").findOne({"_id" : ObjectID(id)});

    res.render('editproduct',{product:result});

});
/*
router.get('/edit', async(req,res)=>{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;

    let client= await MongoClient.connect(url);
    let dbo = client.db("toystore");
    let result = await dbo.collection("product").findOne({"_id" : ObjectID(id)});
    res.render('editDetail',{toy:result});
*/
///---------------------------Post edit infomation-----------------------------
router.post('/product/edit', async(req,res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let price = req.body.price;
    let newValues ={$set: {name: name, type:type, price:price}};
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("Product");
    await dbo.collection("toy").updateOne(condition,newValues);
    //
    let results = await dbo.collection("toy").find({}).toArray();
    res.render('allproduct',{product:results});
});

///------------------------------------Delete Toy------------------------------------


router.get("/product/delete", async (req, res) => {
    let id = req.query.id;
    var ObjectID = require("mongodb").ObjectID;
    let condition = { "_id": ObjectID(id) };

    let client = await MongoClient.connect(url);
    let dbo = client.db("Product");
    await dbo.collection("toy").deleteOne(condition);

    let results = await dbo.collection("toy").find({}).toArray();
    res.render('allproduct', { product: results });

})




module. exports = router;
const express = require('express');
const engines = require('consolidate');
const app = express();
var port = process.env.PORT || 3000;


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

//npm i handlebars consolidate --save
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

var productController = require('./product.js');
app.use('/',productController);
devServer: {
    historyApiFallback :true
}

var server = app.listen(port, function () {});
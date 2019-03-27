//originál https://codesandbox.io/s/xyvpv2lqq
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  var formular = "<form action='/' method='post'>";
  formular += "<select name='crypto'>";
  formular += "<option value='BTC'>Bitcoin</option>";
  formular += "<option value='LTC'>Litecoin</option>";
  formular += "<option value='XMR'>Monero</option>";
  formular += "</select>";
  formular += "<select name='fiat'>";
  formular += "<option value='USD'>USD</option>";
  formular += "<option value='EUR'>EUR</option>";
  formular += "<option value='CZK'>CZK</option>";
  formular += "</select>";
  formular += "<button type='submit' name='button'>Zjisti!</button>";
  formular += "</form>";
  res.send(formular);
});

app.post("/", function(req, res) {
  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  url += req.body.crypto;
  url += req.body.fiat;

  request(url, function(error, response, body) {
    //res.send(body);
    var data = JSON.parse(body);
    res.send(data.last);
    res.send("<h1> Aktuální cena je " + price + "</h1>");
  });

  console.log(req.body.crypto);
  console.log(req.body.fiat);
});

app.listen(8080, function() {
  console.log("Server běží na portu 8080.");
});

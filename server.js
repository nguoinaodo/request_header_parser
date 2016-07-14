var express = require("express");
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/home.html'); 
});
app.get('/whoami', function(req, res) {
    var header = req.headers;
    var ip = header['x-forwarded-for'],
        langArr = header['accept-language'].split(/\;|\,/),
        softArr = header['user-agent'].split(/\(|\)/);
    
    res.json({
        ipaddress: ip,
        language: langArr[0],
        software: softArr[1]
    });
});

app.listen(process.env.PORT, function() {
    console.log('app is listening..');
});
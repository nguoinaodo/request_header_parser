var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    var reqHeaders = req.headers,
        ip = reqHeaders['x-forwarded-for'],
        langArr = reqHeaders['accept-language'].split(/\;|\,/),
        softwareArr = reqHeaders['user-agent'].split(/\(|\)/);
    var info = JSON.stringify({
        ipaddress: ip,
        language: langArr[0],
        software: softwareArr[1]
    });    
    var pathName = url.parse(req.url).pathname;    
    
    if (pathName === '/') {
        res.writeHead(200, {'content-type': 'application/json'});
        res.write(info);
    }
    res.end();
}).listen(process.env.PORT, function() {
    console.log('server is listening..'); 
});
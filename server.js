var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
    requireAuthentication: function(request, response, next) {
        console.log('Private route called!');
        next();
    },
    logger: function(request, response, next) {
        console.log('Request '+ new Date().toString() + ' ' +request.method+' '+request.originalUrl);
        next();
    }
}

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function(req, res) {
    res.send('about us!');
})

console.log(__dirname);

app.use(express.static(__dirname+'/public'));
app.listen(PORT, function() {
    console.log('Express Server started on port '+PORT);
});

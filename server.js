var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(".")).listen(6969, function(){
    console.log('Server running on 6969...');
});

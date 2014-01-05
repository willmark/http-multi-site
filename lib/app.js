var http = require('http'),
    forever = require('forever-monitor'),
    path = require('path'),
    fs = require('fs'),
    httpProxy = require('http-proxy');

//sites configuration file
config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'proxy.json')));
config.router = {}; //build this from the proxy.json file

for (domain in config.domains) {
    servicePath = config.domains[domain].dir;
    console.log('servicePath: ' + servicePath);
    serviceConfig = JSON.parse(fs.readFileSync(path.join(servicePath, 'package.json')));
    console.log('url: ' + config.domains[domain].hostport);
    config.router[domain] = config.domains[domain].hostport;
    service = new (forever.Monitor)(path.join(servicePath, serviceConfig.main || 'index.js' || 'index.node'), {
       max: 3,
       cwd: servicePath,
       options: [
           "--url", config.domains[domain].hostport,
           "--hostname", domain
       ],
       logFile: path.join(servicePath, 'app.forever'),
       errFile: path.join(servicePath, 'app.err'),
       outFile: path.join(servicePath, 'app.log'),
    });
    service.on('exit', function() {
       console.log('Exited process:  ' + Object.keys(this));
    });
    service.start();
}

//proxy server
httpProxy.createServer({
  hostnameOnly: config.hostnameOnly,
  router: config.router
}).listen(8000);

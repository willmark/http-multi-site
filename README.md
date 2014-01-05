http-multi-site
============

> Stability - 2 Example Usage for Linux 

An example layout for handling multiple website/services using nodejitsu/forever module.
Modify proxy.json to match your layout for webservices urls.  Modify bin/nodejs file
ROOT_DIR to match the location of your http-multi-site installation, and copy bin/nodejs
to /etc/init.d to auto-start and stop on system reboot.  Each website/webservice should
be a nodejs http server (ex. express, http, etc.) that can be launched from node.

````
proxy.json contents
{
  "hostnameOnly": "true", //required to be true for nodejitsu/forever to handle the hostport option properly
  "domains": {
    "example1.com": { //domain name for site 1
       "hostport": "localhost:3003", //url location for webservice/site 1
       "dir": "/home/nodejs/websites/example1.com" //full path to the root directory of example1.com
    },
    "example2.com": { //domain name for site 2
       "hostport": "localhost:3002", //url location for webservice/site 1
       "dir": "/home/nodejs/websites/example2.com" //full path to the root directory of example2.com
    },
    "example3.com": { //domain name for site 3
       "hostport": "localhost:3001", //url location for webservice/site 1
       "dir": "/home/nodejs/websites/example3.com" //full path to the root directory of example3.com
    }
  }
}
````

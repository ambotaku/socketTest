let jsonServer = require('json-server');
let bodyParser = require('body-parser');

// Returns an Express server
let server = jsonServer.create();
server.set('superSecret', "mpwctmwprtwxxxcwetr"); // secret letiable

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

let http = require('http').Server(server);

let db = 'lists.json';
let router = jsonServer.router(db);

server.use('/api', router);

let io = require('socket.io')(3001);
let _socketMap = {};
io.on('connection', function (socket) {
  console.log(`get connection for ${socket.id}`);
  _socketMap[socket.id] = socket;
  socket.on('broadcast', function (data) {
    let message = JSON.stringify(data);
    console.log(`get broadcast data: ${message}`)
    for (let socketKey in _socketMap) {
      let broadcastTo = _socketMap[socketKey];
      if (1 || socket.id !== broadcastTo.id) {
        broadcastTo.emit('update', data)
        console.log(`send broadcast data ${message}`);
      }
    }
  });
});

router.render = function (req, res, next) {
  res.header('Access-Control-Expose-Headers', 'Content-Type, Location,Content-Length');
  res.jsonp(res.locals.data);
};

server.listen(3000);

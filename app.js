const WebSocket = require('ws');
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://mq.hackeriet.no')
const wss = new WebSocket.Server({ port: 8884 });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
    console.log("wss connect")
});



client.subscribe("hackeriet/environment/#");

client.on('message', function (topic, message) {
    wss.broadcast(topic + " " + message)
    console.log(topic + " " + message.toString())
})





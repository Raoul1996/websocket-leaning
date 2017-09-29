const ws = require('nodejs-websocket')
const PORT = 8001
let clientCount = 0
let server = ws.createServer(function (conn) {
  console.log('New Connection: ' + conn)
  clientCount++
  conn.nickname = `user${clientCount}`
  broadCast(conn.nickname + ' comes in')
  conn.on('text', function (str) {
    console.log('recv: ' + str)
    broadCast(str)
  })
  conn.on('close', function (code, reason) {
    console.log('Connection closed')
    broadCast(conn.nickname + ' left')
  })
  conn.on('error', function (err) {
    console.log('handle err')
    console.log(err)
  })
}).listen(PORT)
console.log('websocket server listening on port ' + PORT)

function broadCast(str) {
  server.connections.forEach(function (connection) {
    connection.sendText(str)
  })
}
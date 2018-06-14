'use strict';

const http = require('http');
const childProcess = require('child_process');

const server = http.createServer((request, response) => {
  childProcess.exec('cd ../tek-tank-demo && git pull && npm test', (error, stdout, stderr) => {
    if (error) {
      response.writeHead(500)
      response.end('Integration failed: ' + stdout + stderr)
    } else {
      response.end('Integration OK: ' + stdout)
    }
  })
})
server.listen(8000)


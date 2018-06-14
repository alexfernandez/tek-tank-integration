'use strict';

const http = require('http');
const childProcess = require('child_process');

const server = http.createServer((request, response) => {
  childProcess.exec('cd ../tek-tank-demo && git pull && npm test', (error, stdout, stderr) => {
    if (error) {
      response.writeHead(500)
      response.end('Integration failed: ' + stdout + stderr)
    } else {
      console.log('int ok')
      childProcess.exec('ssh ubuntu@54.154.61.33 "cd tek-tank-demo && git pull"', (error, stdout2, stderr2) => {
        if (error) {
          console.error('dep failed %s', stderr2)
          response.writeHead(500)
          response.end('Deployment failed: ' + stdout2 + stderr2)
        } else {
          console.log('dep ok')
          response.end('Integration OK: ' + stdout + '\nDeployment OK: ' + stdout2)
        }
      })
    }
  })
})
server.listen(8000)


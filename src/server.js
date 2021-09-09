const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  //   console.log(req.body)
  console.log(req.ips)
  console.log(req.ip)
  console.log(req.socket.remoteAddress)
  console.log(req.headers)
  console.log(JSON.stringify(req.body,null,4))
  res.send(req.ip)
})

app.post('/', (req, res) => {
  console.log(req.ips)
  console.log(req.ip)
  console.log(req.socket.remoteAddress)
  console.log(req.headers)
  console.log(JSON.stringify(req.body,null,4))
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
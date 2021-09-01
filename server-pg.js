const express = require('express')
const app = express()
const port = 3000

const { Pool } = require('pg');
const pool = new Pool({
  user: 'kudev',
  host: 'nonprod-dev.cl3r02fxxjip.ap-southeast-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'Gable2020',
  port: 5432,
  connectionTimeoutMillis: 10000,
  query_timeout: 10000,
  min: 5,
  max: 100
})

pool.on('error', (err, client) => {
  console.log('Unexpexted error on idle client', err);
})

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  //   console.log(req.body)
  res.send('Hello World!')
})

app.get('/subject/:name', (req, res) => {

  // console.log(req.params.name)

  let name = req.params.name

  // console.log(name)

  pool
    .connect()
    .then(client => {
      return client
        .query('select * from cls_t_section where subject_name_th like $1', [`%${name}%`])
        .then(data => {
          client.release()
          // console.log(res.rows[0])
          res.send(data.rows);
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
          res.status(500).send({ message: 'error' })
        })
    })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const {Pool} = require('pg');
const pool = new Pool({
    user:'kudev',
    host: 'nonprod-dev.cl3r02fxxjip.ap-southeast-1.rds.amazonaws.com',
    database : 'postgres',
    password : 'Gable2020',
    port : 5432,
    connectionTimeoutMillis : 10000,
    query_timeout : 10000,
})

pool.on('error',(err,client)=>{
    console.log('Unexpexted error on idle client',err);
})

// pool.connect((err,client,done)=>{
//     if(err)throw err
//     client.query('select * from cls_t_section where subject_name_th like $1',['%อาหาร%'],(err,res)=>{
//         done()
//         if(err){
//             console.log(err.stack)
//         }else{
//             console.log('data rows', res.rows[0])
//         }
//     })
// })

pool
  .connect()
  .then(client => {
    return client
      .query('select * from cls_t_section where subject_name_th like $1',['%อาหาร%'])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })


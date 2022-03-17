const express = require('express')
const app = express()
const port = 3000

const config = {
   host: 'db',
   user: 'root',
   password: 'root',
   database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Victor Guimarães')`
connection.query(sql)
connection.end()

const con = mysql.createConnection(config)
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM people", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
        app.get('/consulta', (req,res) => {
            res.send(result)
        })
        app.get('/', (req,res) => {
            res.send('<h1>Full Cycle Rocks!</h1>')
        })
    });
  });






app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
const {
  seed,
  client,
} = require('./db');
const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  await seed();
  console.log('create your tables and seed data');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();

const express = require('express')

const server = express();

server
  .get('/', (req, res) => res.send('Oi, gatinha'))
  .listen(3000, () => console.log('Ouvindo'));

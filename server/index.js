const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');

require('dotenv').config({ path: 'variables.env' });

const app = express();
const port = process.env.PORT || 3000;

let pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  encrypted: process.env.PUSHER_APP_SECURE,
  cluster: process.env.PUSHER_APP_CLUSTER,
});

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
  res.status(200).send({ service: 'Pusher activity feed API' });
});

app.post('/submit', (req, res) => {
  const nome = req.body.nome;
  const avaliacao = req.body.avaliacao;

  if (nome === undefined) {
    res
      .status(400)
      .send({ message: 'Please provide your name', status: false });
    return;
  }

  if (avaliacao === undefined) {
    res
      .status(400)
      .send({ message: 'Please provide your rating', status: false });
    return;
  }

  pusher.trigger('1061', 'accept', {
    nome: nome,
    avaliacao: avaliacao,
    time: new Date(),
  });

  res
    .status(200)
    .send({ message: 'Response was successfully created', status: true });
});

app.listen(port, function() {
  console.log(`API is running at ${port}`);
});

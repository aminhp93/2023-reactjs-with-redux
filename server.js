const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

const config = {
  pusher: {
    app_id: '1435319',
    key: '15ee77871e1ed5258044',
    secret: '4c2b97bec11d18dc8a13',
    cluster: 'ap1',
  },
};

const ChatUrls = {
  getChat: '/api/chat/',
  createChat: '/api/chat/',
};

const pusher = new Pusher({
  appId: config.pusher.app_id,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
  encrypted: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'build')));

app.set('PORT', process.env.PORT || 5000);

app.post(ChatUrls.createChat, (req, res) => {
  const payload = req.body;
  pusher.trigger('chat', 'message', payload);
  res.send(payload);
});

app.get(ChatUrls.getChat, (req, res) => {
  res.status(200).json({ test: 'ok' });
});

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(app.get('PORT'), () =>
  console.log('Listening at ' + app.get('PORT'))
);

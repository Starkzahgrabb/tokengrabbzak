const express = require('express');
const routes = require('./endpoints');
const PORT = process.env.PORT || 80;
const webhook = process.env.WEBHOOK;

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('hi'));
app.post('/api/v1/send', (req, res) => routes.send(req, res, webhook));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

// Set director to load static files from.
const publicPath = path.join(__dirname, '/../public');
app.use('public', express.static(publicPath));

// GET '/'
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

app.get('/*', (req, res) => {
  res.send('this route isn\'t configured yet!')
});

app.listen(PORT, () => {
  console.log(`Server is up and listening on port: ${PORT}`);
});
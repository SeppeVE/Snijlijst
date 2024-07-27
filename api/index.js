const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve static files from the "html" directory within "public"
app.use('/html', express.static(path.join(__dirname, '../public/html')));

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from Node.js API!' });
});

app.post('/api/dimensions', (req, res) => {
  const { pageHeight, pageWidth } = req.body;
  const aspectRatio = pageWidth / pageHeight;

  res.json({ aspectRatio });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

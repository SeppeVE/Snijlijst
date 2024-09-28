const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from Node.js API!' });
});

app.post('/api/dimensions', (req, res) => {
  const { pageHeight, pageWidth } = req.body;
  const aspectRatio = pageWidth / pageHeight;

  const maxWidth = 400;
  const maxHeight = 400;

  let displayWidth, displayHeight;

  if (aspectRatio > 1) {
    displayWidth = maxWidth;
    displayHeight = maxWidth / aspectRatio;
  } else {
    displayHeight = maxHeight;
    displayWidth = maxHeight * aspectRatio;
  }

  const hFactor = displayHeight / pageHeight;
  const wFactor = displayWidth / pageWidth;

  // You could pass these as response or render an HTML template server-side
  res.json({
    aspectRatio,
    displayWidth,
    displayHeight,
    hFactor,
    wFactor,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

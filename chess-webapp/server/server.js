const express = require('express');
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World from Node.js server!');
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const path = require('path');

app.get("", (req, res) => {
})

// app.use(express.static(path.join(__dirname, '../dist/chess-webapp/browser')));

// app.get(/(.*)/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/chess-webapp/browser/index.html'));
// });

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/api/:date?', (req, res) => {
  let date;

  if (!req.params.date) {
    date = new Date();
  } else if (!isNaN(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

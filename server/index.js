require('dotenv').config();

const express = require('express');
const cors = require('cors');
const transcriptRoutes = require('./src/routes/transcriptRoutes');
const learnRoutes = require('./src/routes/learnRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api', transcriptRoutes);
app.use('/api', learnRoutes);
app.use('/api', chatRoutes);

app.get('/', (req, res) => {
  res.send('LearnTube API is running.');
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
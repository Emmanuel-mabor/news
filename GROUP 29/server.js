
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/newsAggregator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const newsArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  source: String,
});

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);


app.get('/api/top-headlines', (req, res) => {
 

  NewsArticle.find({}, (err, articles) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch articles' });
    } else {
      res.json(articles);
    }
  });
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

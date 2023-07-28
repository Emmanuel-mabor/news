
const sampleArticles = [
    {
      title: 'Sample Article 1',
      description: 'This is a sample article.',
      source: 'Sample News',
    },
    {
      title: 'Sample Article 2',
      description: 'Another sample article for testing.',
      source: 'Test News',
    },
  ];
  

  NewsArticle.find({}, (err, articles) => {
    if (err) {
      console.error('Failed to fetch articles from the database:', err);
    } else if (articles.length === 0) {
      NewsArticle.insertMany(sampleArticles, (err) => {
        if (err) {
          console.error('Failed to save sample articles to the database:', err);
        } else {
          console.log('Sample articles saved to the database.');
        }
      });
    }
  });
  
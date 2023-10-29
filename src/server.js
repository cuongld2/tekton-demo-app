const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

const postRoutes = require('./routes/postRoutes');

mongoose
  .connect('mongodb://localhost:27017/posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected with database.');
    app.emit('db-connected');
  })
  .catch((e) => console.log(e));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/posts', postRoutes);

app.on('db-connected', () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`http://localhost:${port}/posts`);
  });
});

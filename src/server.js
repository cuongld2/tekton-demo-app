const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.APP_PORT;

const postRoutes = require('./routes/postRoutes');
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

mongoose
  .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`, {
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

app.use(`/${MONGO_DB_NAME}`, postRoutes);

app.on('db-connected', () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`http://localhost:${port}/${MONGO_DB_NAME}`);
  });
});

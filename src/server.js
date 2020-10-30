const { PORT, MONGO_URI } = require('./common/config');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(async () => {
    console.log('MongoDB connected!');
    /* const dropDB = await mongoose.connection.db.dropDatabase();
    const message = dropDB
      ? 'DB is dropped before use'
      : 'Error drop DB before use';
    console.log(message); */
  })
  .catch(error => console.log(error));

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

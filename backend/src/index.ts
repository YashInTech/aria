import app from './app.js';
import { connectToDatabase } from './db/connection.js';

//connections & listeners
const PORT = 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log('Server Open & Connected to Database'));
  })
  .catch((err) => console.log(err));

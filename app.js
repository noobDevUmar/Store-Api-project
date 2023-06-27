require('dotenv').config();
require('express-async-errors')


const express = require('express');
const app = express();

const productRouter = require('./routes/products')
// const { MongoClient } = require('mongodb');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

// Middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>STORE API</h1> <a href="/api/v1/products">CLICK Me</a>');
});

// Product route
app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// const start = async () => {
//   try {
//     const uri = process.env.MONGO_URI; // Get the MongoDB connection string from your .env file
//     const client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     await client.connect();
//     console.log('Connected to MongoDB');

//     app.listen(8080, () => {
//       console.log('Server is listening on port 8080');
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

const start = async () => {
  try {
    await connectDB("mongodb+srv://umer:123@cluster0.nszpwqv.mongodb.net/STORE-API-PROJECT?retryWrites=true&w=majority")
    app.listen(8080, () => {
      console.log('Server is listening on port 8080');
    });
  } catch (error) {
    console.error(error);
  }
}




start();

require('dotenv').config()
const { MongoClient } = require('mongodb');

const { connect } = require('mongoose')
const connectDB = require('./db/connect')

const Product = require('./models/product')
const jsonProducts = require('./product.json')






// const start = async () => {
//     try {
     
//       const client = new MongoClient("mongodb+srv://umer:123@cluster0.nszpwqv.mongodb.net/STORE-API-PROJECT?retryWrites=true&w=majority", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 60000, // 30 seconds
//   socketTimeoutMS: 60000, // 45 seconds
//       });
  
//       await client.connect();

//       // await Product.deleteMany()
//      // products.insertOne()
//        await Product.create(jsonProducts);
//       console.log('Connection SUCCESS');
  
 
//     } catch (error) {
//       console.error(error);
//     }
//   };

const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(jsonProducts);
    console.log("Success")
    process.exit(0)
  } catch (error) {
    process.exit(1)
    
  }
}




start()
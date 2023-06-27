const mongoose = require('mongoose');
const url = "mongodb+srv://umer:abc@cluster0.nszpwqv.mongodb.net/STORE-API-PROJECT?retryWrites=true&w=majority"

// const connectDB = async (url) => {
//   try {
//     await mongoose.connect( {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true, // New option
//       useFindAndModify: false, // New option
//     });

//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//   }
// };

const connectDB = (url)=>{
  return mongoose.connect(url,{
    useNewUrlParser: true,
      useUnifiedTopology: true,

})}



module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/unitel-basket';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('MongoDB conectado:', uri);
};

module.exports = connectDB;

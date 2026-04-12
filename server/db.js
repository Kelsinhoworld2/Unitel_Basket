const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/unitel-basket';
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Conectado ao MongoDB com sucesso');
      console.log('MongoDB URI:', uri);
    })
    .catch((err) => {
      console.error('Erro na conexão MongoDB:', err);
      throw err;
    });
};

module.exports = connectDB;

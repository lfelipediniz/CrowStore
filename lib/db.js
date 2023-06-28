import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // URI de conexão com o seu banco de dados MongoDB
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // Se estiver em ambiente de desenvolvimento, armazene a conexão em cache para reutilização.
  if (!clientPromise) {
    clientPromise = MongoClient.connect(uri, options).then((client) => {
      return {
        client,
        db: client.db('crowBD'),
      };
    });
  }
}

export default async function connectToDatabase() {
  if (!clientPromise) {
    clientPromise = MongoClient.connect(uri, options).then((client) => {
      return {
        client,
        db: client.db('crowBD'),
      };
    });
  }
  client = await clientPromise;
  return client;
}

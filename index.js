import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import movieRoutes from './Routes/movieRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;


const uri = "mongodb+srv://Mohamed_Ibrahim_M:21012004@cluster0.yqvuds4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const dbName = 'moviesDB';
let db;

//connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(uri);
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with an error code
    }
    
}

connectToMongoDB()


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','DELETE','PUT','PATCH'],
    allowHeaders: ['Content-Type','Authorization'],
}))

app.use((req, res, next) => {
    req.db = db;
    req.db.ObjectId = ObjectId;
    next();
});



  app.use('/db',movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

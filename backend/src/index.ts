import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import router from '../routes/routes'

const PORT = 4000

const app = express();
app.use(express.json());
app.use(cors())

const MONGO_URL = 'mongodb+srv://reggie-adino-red:123456Hh&@cluster0.kdx6cel.mongodb.net/ng-17MessagingApp?retryWrites=true&w=majority'

mongoose.connect(MONGO_URL,{
    dbName: 'ng-17MessagingApp',
}).then(() => {
    console.log("Database connected...")
}).catch((error) => {
    console.log("error", error)
})

app.use('/', router)

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})
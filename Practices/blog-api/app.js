import  express, {urlencoded}  from 'express';
import  dotenv  from 'dotenv';
import { connectDB } from './config/db.js';
import { blogRoutes } from './routes/blog.routes.js';


dotenv.config();

const PORT = process.env.PORT;

connectDB();
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(blogRoutes);

app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
    
})

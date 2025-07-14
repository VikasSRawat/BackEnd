import  express  from 'express';
import  dotenv  from 'dotenv';
import { connectDB } from './config/db';
import { blogRoutes } from './routes/blog.routes';


dotenv.config();

const PORT = process.env.PORT;

connectDB();
const app = express();

app.use(blogRoutes);

app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
    
})

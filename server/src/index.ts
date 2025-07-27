import express from 'express';
import apiRoutes from './routes/index'

const app = express();
const PORT = 3000;

app.get('/', (req:express.Request,res:express.Response) => {
    res.end('Hello From BE server');
})
app.use(express.json())
app.use('/api',apiRoutes);

app.listen(PORT, () => {
    console.log('Server is listening at port : ', PORT);
})
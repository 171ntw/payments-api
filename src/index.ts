import express from 'express';
import paymentsRouter from './routes/index';

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/pages');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Payments API is running!');
});

app.use('/api/payments', paymentsRouter);

app.use((req, res, next) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000');
});
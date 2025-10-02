import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import ordersRouter from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Routes
app.use('/api/orders', ordersRouter);

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to node-ci-demo API' });
});

// Start server only if run directly (not during tests importing app)
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

export default app;

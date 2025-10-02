import { Router } from 'express';
import { listOrders, createOrder, getOrderById } from '../services/ordersService.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(listOrders());
});

router.post('/', (req, res) => {
  const { item, quantity } = req.body || {};
  if (!item || typeof quantity !== 'number') {
    return res.status(400).json({ error: 'item (string) and quantity (number) are required' });
  }
  const created = createOrder({ item, quantity });
  res.status(201).json(created);
});

router.get('/:id', (req, res) => {
  const found = getOrderById(req.params.id);
  if (!found) return res.status(404).json({ error: 'Order not found' });
  res.json(found);
});

export default router;

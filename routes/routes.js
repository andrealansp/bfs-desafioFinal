import express from 'express';
import services from "../services/transactionService.js";

const transactionRouter = express.Router();

transactionRouter.get('/', services.getPeriod);
transactionRouter.get('/:id', services.findTransactionByID);
transactionRouter.get('/findbydate/:date', services.findTransactionByDate);
transactionRouter.get('/findbycategory/:category', services.findTransactionByCategory);
transactionRouter.post('/', services.saveTransaction);
transactionRouter.put('/:id', services.updateTransaction);
transactionRouter.delete('/:id', services.deleteTransaction);
transactionRouter.use(services.handleErros);

export default transactionRouter;
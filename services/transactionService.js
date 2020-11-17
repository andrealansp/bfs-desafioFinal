import mongoose from 'mongoose';
import {
  logger
} from '../config/logger.js';
import TransactionModel from '../models/TransactionModel.js';

const db = TransactionModel;
const ObjectId = mongoose.Types.ObjectId;

const getPeriod = async (req, res, next) => {
  const {
    period
  } = req.query;

  try {
    if (!req.query.period) {
      return res.status(400).send({
        message: 'Please provide a period',
      });
    }
    const result = await db.find({
      yearMonth: period
    });
    logger.info('Sucesso - get: /:period');
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const saveTransaction = async (req, res, next) => {
  if (!req.body.value) {
    return res.status(400).send({
      message: 'Please, provide a data to save on database.',
    });
  }
  const {
    description,
    value,
    category,
    type,
    yearMonthDay
  } = req.body;

  const dataTransaction = yearMonthDay.split('-');

  const newTransaction = new db({
    description: description,
    value: parseFloat(value),
    category: category,
    year: parseInt(dataTransaction[0]),
    month: parseInt(dataTransaction[1]),
    day: parseInt(dataTransaction[2]),
    yearMonth: `${dataTransaction[0]}-${dataTransaction[1]}`,
    yearMonthDay: yearMonthDay,
    type: type
  });
  try {
    const result = await newTransaction.save();
    logger.info(`Sucesso - post: /`);
    res.send(result);
  } catch (error) {
    next(error);
  }
}
const deleteTransaction = async (req, res, next) => {
  let id = req.params.id;
  try {
    const result = await db.findByIdAndDelete({
      _id: id
    });
    logger.info(`Sucesso - Delete: /:id`);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const findTransactionByID = async (req, res, next) => {
  try {
    const result = await db.findById({
      _id: req.params.id
    });
    if (!result) {
      logger.info("INFO - Didn't finded any document !")
      res.send("Didn't finded any document !");
    } else {
      logger.info(`sucesso - get: /findTransactionByDate/:date`);
      res.send(result);
    }
  } catch (error) {
    next(error);
  }
};

const findTransactionByDate = async (req, res, next) => {
  const date = req.params.date;
  try {
    const result = await db.find({
      yearMonthDay: date
    })
    logger.info(`Sucesso - get: /findTransactionByDate/:date`);
    res.send(result)
  } catch (error) {
    next(error);
  }
}

const findTransactionByCategory = async (req, res, next) => {
  const category = req.params.category;
  try {
    const result = await db.find({
      category: {
        $regex: new RegExp(category),
        $options: 'i'
      }
    })
    logger.info(`Sucesso - get: /findTransactionByCategory/:category`);
    res.send(result)
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await db.findByIdAndUpdate({
      _id: id
    }, req.body, {
      new: true,
    });
    logger.info(`Sucesso - put: /:id`);
    res.send(result);
  } catch (error) {
    next(error)
  }
};

const handleErros = (err, req, res) => {
  logger.error(`Rota: ${req.method} - Error: ${err.message}`);
  res.status(400).send({
    error: err.message
  });
};


export default {
  getPeriod,
  handleErros,
  saveTransaction,
  findTransactionByDate,
  findTransactionByCategory,
  deleteTransaction,
  findTransactionByID,
  updateTransaction,
}
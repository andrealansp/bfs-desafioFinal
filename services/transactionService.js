import mongoose from 'mongoose';
import TransactionModel from '../models/TransactionModel.js';

const db = TransactionModel;
const ObjectId = mongoose.Types.ObjectId;

const getPeriod = async (req, res, next) => {
  const {
    period
  } = req.query;
  try {
    const result = await db.find({
      yearMonth: period
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const saveTransaction = async (req, res, next) => {

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
    !result ? res.send("Didn't finded any document !") : res.send(result)
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
    res.send(result);
  } catch (error) {
    next(error)
  }


};

const handleErros = (err, req, res, next) => {
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
import React from 'react';
import './Acumulators.css';

export default function Acumulators(props) {
  return (
    <div className="row borderLine">
      <div className="col s3 left-align">Lançamentos: {props.lancamentos}</div>
      <div className="col s3 left-align">Receitas: {props.receitas}</div>
      <div className="col s3 left-align">Despesas: {props.despesas}</div>
      <div className="col s3 left-align">Saldo: {props.saldo}</div>
    </div>
  );
}

import React, {useEffect, useState} from 'react';
import PeriodSelector from './Components/PeriodSelector/PeriodSelector';
import Acumulators from './Components/Acumulators/Acumulators';
import axios from 'axios';
import M from 'materialize-css';

export default function App() {
  useEffect(() => {
    M.AutoInit();
  });

  const [lancamentos, setLancamentos] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const onHandleChildPeriodSelector = async (period) => {
    const response = await axios.get(
      `http://localhost:3001/api/transaction?period=${period}`
    );

    const newArrayResponse = Array.from(response.data);

    setLancamentos(newArrayResponse.length);

    setReceitas(
      newArrayResponse.reduce((acc, cur) => {
        if (cur.type === '+') {
          acc += cur.value;
        }
        return acc;
      }, 0)
    );
    setDespesas(
      newArrayResponse.reduce((acc, cur) => {
        if (cur.type === '-') {
          acc += cur.value;
        }
        return acc;
      }, 0)
    );

    setSaldo(receitas - despesas);
    console.log(receitas);
    console.log(despesas);
  };

  return (
    <div className="container center">
      <PeriodSelector onHandleChangePeriod={onHandleChildPeriodSelector} />
      <Acumulators
        lancamentos={lancamentos}
        despesas={despesas}
        receitas={receitas}
        saldo={saldo}
      />
    </div>
  );
}

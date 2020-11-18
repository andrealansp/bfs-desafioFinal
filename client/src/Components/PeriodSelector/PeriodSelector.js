import React, {useState} from 'react';

export default function PeriodSelector(props) {
  const {onHandleChangePeriod} = props;

  const [selectValue, setSelectValue] = useState('2019-01');

  const onChangePeriod = (event) => {
    const newPeriod = event.target.value;
    setSelectValue(newPeriod);
    onHandleChangePeriod(newPeriod);
  };

  return (
    <div className="row">
      <div className="col s1 offset-s3">
        <button type="button">
          <i className="tiny material-icons">expand_less</i>
        </button>
      </div>
      <div className="col s3">
        <label>
          Período:
          <select value={selectValue} onChange={onChangePeriod}>
            <option value="2019-01"> jan/19 </option>
            <option value="2019-02"> fev/19 </option>
            <option value="2019-03"> mar/19 </option>
            <option value="2019-04"> abr/19 </option>
            <option value="2019-05"> mai/19 </option>
            <option value="2019-06"> jun/19 </option>
            <option value="2019-07"> jul/19 </option>
            <option value="2019-08"> ago/19 </option>
            <option value="2019-09"> set/19 </option>
            <option value="2019-10"> out/19 </option>
            <option value="2019-11"> nov/19 </option>
            <option value="2019-12"> dez/19 </option>
            <option value="2020-01"> jan/20 </option>
            <option value="2020-02"> fev/20 </option>
            <option value="2020-03"> mar/20 </option>
            <option value="2020-04"> abr/20 </option>
            <option value="2020-05"> mai/20 </option>
            <option value="2020-06"> jun/20 </option>
            <option value="2020-07"> jul/20 </option>
            <option value="2020-08"> ago/20 </option>
            <option value="2020-09"> set/20 </option>
            <option value="2020-10"> out/20 </option>
            <option value="2020-11"> nov/20 </option>
            <option value="2020-12"> dez/20 </option>
            <option value="2021-01"> jan/21 </option>
            <option value="2021-02"> fev/21 </option>
            <option value="2021-03"> mar/21 </option>
            <option value="2021-04"> abr/21 </option>
            <option value="2021-05"> mai/21 </option>
            <option value="2021-06"> jun/21 </option>
            <option value="2021-07"> jul/21 </option>
            <option value="2021-08"> ago/21 </option>
            <option value="2021-09"> set/21 </option>
            <option value="2021-10"> out/21 </option>
            <option value="2021-11"> nov/21 </option>
            <option value="2021-12"> dez/21 </option>
          </select>
        </label>
      </div>
      <div className="col s1">
        <button type="button">
          <i className="tiny material-icons">expand_more</i>
        </button>
      </div>
    </div>
  );
}

import React from 'react';

const Select = props => {
  let optionElements = props.options.map(stars =>{
    return (
      <option key={stars} value={stars}>{stars}</option>
    );
  })

  return (
    <label className={props.className}>{props.label}
      <select name={props.name} value={props.selectedOption} onChange={props.handlerFunction}>
        <option value=""></option>
        {optionElements}
      </select>
    </label>
  );
}

export default Select;

const CustomSelect = (props) => {
  const displayData = props.data.map((el) => {
    return (
      <option key={el.id} value={el.id}>
        {el.name}
      </option>
    );
  });

  return (
<>
    <div className={props.cardClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        className={props.selectClass}
        id={props.id}
        onChange={(e) => props.handler(props.name, e.target.value)}
        value={props.value && props.value}
      >
        <option value={0}>Izaberite...</option>
        {displayData}
      </select>
      {props.error && <p className="text-danger">{props.error}</p>}
    </div></>
  );
};

export default CustomSelect;

const InputField = (props) => {
  return (
    <div className={props.cardClass}>
      <label className="text-muted" htmlFor={props.id}>
        {props.label}
      </label>
      {props.textarea ? (
        <>
          <textarea
            className={props.inputClass}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            defaultValue={props.value}
            onChange={(e) => props.handler(props.name, e.target.value)}
          ></textarea>
          {props.error && <p className="text-danger">{props.error}</p>}
        </>
      ) : (
        <>
          <input
            className={props.inputClass}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.name === "image" ? (e) => props.handler(props.name, e.target.files[0]) : (e) => props.handler(props.name, e.target.value)}
          />
          {props.error && <p className="text-danger">{props.error}</p>}
        </>
      )}
    </div>
  );
};

export default InputField;

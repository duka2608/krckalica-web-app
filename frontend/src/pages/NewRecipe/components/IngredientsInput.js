const IngredientsInput = (props) => {
  return (
    <div className="form-inline row mt-3">
      <div className="col-md-4">
        <label>Sastojak</label>
        <input type="text" className="form-control" name="name" value={props.nameValue} onChange={(e) => props.inputHandler(props.ingredientIndex, e)} />
      </div>
      <div className="col-md-4">
        <label>Kolicina</label>
        <input type="text" className="form-control" name="amount" value={props.amountValue} onChange={(e) => props.inputHandler(props.ingredientIndex, e)} />
      </div>
      <div className="col-md-2 d-flex align-items-end">
        {
         <div className="btn btn-success px-3" onClick={() => props.removeInput(props.ingredientIndex) }>-</div>
        }
        {
          props.ingredientsLength - 1 === props.ingredientIndex ? <div className="btn btn-success mx-3" onClick={() => props.addNewInput() }>+</div> : null
        }
      </div>
    </div>
  );
}

export default IngredientsInput;
const DropdownList = (props) => {
  const categoriesDisplay = props.data.map((el) => (
    <a href="#" className="dropdown-item" key={el.id}>
      {el.name}
    </a>
  ));

  return (
    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      {categoriesDisplay}
    </div>
  );
};

export default DropdownList;

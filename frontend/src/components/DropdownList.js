import { Link } from "react-router-dom";

const DropdownList = (props) => {
  const categoriesDisplay = props.data.map((el) => (
    <Link to={`/recipes/${props.title}/${el.id}`} className="dropdown-item" key={el.id}>
      {el.name}
    </Link>
  ));

  return (
    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      {categoriesDisplay}
    </div>
  );
};

export default DropdownList;

import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";
import ReactPaginate from "react-paginate";

const FavoriteRecipes = ({ id }) => {
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const fetchUserRecipes = (selectedPage = 1) => {
    axios
      .get(`http://localhost:8000/api/user/${id}/recipes/favorite?page=${selectedPage}`)
      .then(
        (res) => {
          setRecipes(res.data.data)
          let count = Math.ceil(res.data.total / res.data.per_page);
          setPageCount(count);
        }
        );
  };

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const favRecipes = recipes.length < 1 ? <h1>Nemate izabrane omiljene recepte.</h1> : recipes.map((recipe) => {
    return (
      <div className="col-12 col-sm-6 col-lg-3" key={recipe.recipe.id}>
        <RecipeCard
          id={recipe.recipe.id}
          name={recipe.recipe.name}
          path={
            recipe.recipe.image
              ? "http://localhost:8000/" +
                recipe.recipe.image[0].path +
                recipe.recipe.image[0].name
              : ""
          }
          rating={false}
        />
      </div>
    );
  });

  const handlePageClick = (e) => {
    fetchUserRecipes(e.selected + 1);
  }

  return (
    <>
      {favRecipes}
      <div className="row">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          containerClassName={"pagination d-flex justify-content-center"}
          activeClassName={"activeLink"}
          breakLinkClassName={"pageLink"}
          pageClassName={"pageItem"}
          pageLinkClassName={"pageLink"}
          previousClassName={"pageItem"}
          previousLinkClassName={"pageLink"}
          nextClassName={"pageItem"}
          nextLinkClassName={"pageLink"}
        />
      </div>
    </>
  );
};

export default FavoriteRecipes;

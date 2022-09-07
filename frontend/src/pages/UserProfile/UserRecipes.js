import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";
import LoadingPage from "../../components/LoadingPage";
import ReactPaginate from "react-paginate";

const UserRecipes = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const fetchUserRecipes = (selectedPage = 1) => {
    axios
      .post(`http://krckalica-web-app-backend.herokuapp.com/api/user/${id}/recipes?page=${selectedPage}`)
      .then((res) => {
        setUserRecipes(res.data.data);
        let count = Math.ceil(res.data.total / res.data.per_page);
        setPageCount(count);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchUserRecipes();
  }, []);

  const handlePageClick = (e) => {
    fetchUserRecipes(e.selected + 1);
  };

  const recipes =
    userRecipes.length < 1 ? (
      <h3>Trenutno nemate unete recepte.</h3>
    ) : (
      userRecipes.map((recipe) => {
        return (
          <div className="col-12 col-sm-6 col-lg-3" key={recipe.id}>
            <RecipeCard
              id={recipe.id}
              name={recipe.name}
              path={
                recipe.images
                  ?
                    recipe.images[0].path +
                    recipe.images[0].name
                  : ""
              }
              rating={false}
            />
          </div>
        );
      })
    );

  return (
    <>
      {loading && <LoadingPage />}
      {recipes}
      {userRecipes.length > 0 && (
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
      )}
    </>
  );
};

export default UserRecipes;

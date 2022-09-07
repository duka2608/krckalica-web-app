import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

const CommentBox = styled.div`
  border-left: 3px solid #40ba37;
  padding: 15px;
  background-color: #f4f4f4;
  margin-bottom: 20px;

  h4 {
    font-weight: 600;
    color: #474747;
    margin-top: 0.5rem;
  }

  p {
    margin-top: 15px;
  }

  span {
    font-size: 12px;
    color: #c8c8c8;
  }

`;

const Comments = ({ recipeId, dateFormat, itemsPerPage }) => {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [comment, setComment] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
;
  const user = useSelector(state => state.user);

  const fetchComments = () => {
    axios
      .post(`http://krckalica-web-app-backend.herokuapp.com/api/recipes/${recipeId}/comments`)
      .then((response) => {
        setCommentsCount(response.data.comments.length);

        const endOffset = itemOffset + itemsPerPage;
        setComments(response.data.comments.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(response.data.comments.length / itemsPerPage));
    });
  };

  useEffect(() => {
    fetchComments();

  }, [recipeId, itemOffset, itemsPerPage]);

  const submitComment = (e) => {
    e.preventDefault();

    axios
      .post("http://krckalica-web-app-backend.herokuapp.com/api/comments/add", {
        comment,
        recipe_id: recipeId,
        user_id: user.id
      })
      .then((response) => {
        setCommentsCount(response.data.comments.length);
        const endOffset = itemOffset + itemsPerPage;
        setComments(response.data.comments.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(response.data.comments.length / itemsPerPage));
      });

    setComment("");
  };

  const commentsDisplay = comments.map((comment) => {
      return (
        <CommentBox key={comment.id}>
          <h4>{comment.user.first_name + " " + comment.user.last_name}</h4>
          <p>{comment.content}</p>
          <span>{dateFormat(comment.created_at)}</span>
        </CommentBox>
      );
    });

    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % commentsCount;
        setItemOffset(newOffset);
    }

  return (
    <div className="col-12 col-lg-8 mt-3">
      <h2>Komentari</h2>
      {user &&       <div className="mb-4">
        <form onSubmit={submitComment}>
          <div className="form-group mb-3">
            <label className="text-muted" htmlFor="exampleFormControlTextarea1">
              Vaš komentar
            </label>
            <textarea
              className="form-control form-textarea"
              id="exampleFormControlTextarea1"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn form-btn">
              Pošalji
            </button>
          </div>
        </form>
      </div>}
      <div>{comments && commentsDisplay}</div>
        {comments.length > 0 && <div className="row">
          <ReactPaginate 
                    previousLabel={'<'}
                    nextLabel={'>'} 
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    containerClassName={'pagination d-flex justify-content-center'}
                    activeClassName={'activeLink'}
                    breakLinkClassName={'pageLink'}
                    pageClassName={'pageItem'}
                    pageLinkClassName={'pageLink'}
                    previousClassName={'pageItem'}
                    previousLinkClassName={'pageLink'}
                    nextClassName={'pageItem'}
                    nextLinkClassName={'pageLink'}
            />
      </div>}
    </div>
  );
};

export default Comments;

import { Link } from 'react-router-dom';
import styled from "styled-components";


const RecipeContainer = styled.div`
    margin-bottom: 30px;

    img {
        max-width: 100%;
        border-bottom: 3px solid var(--main-green);
        object-fit: cover;
    }

    .recipe-content {
        padding-top: 30px;
        text-align: center;
    }

    .link {
        transition-duration: 500ms;
        outline: 0 solid transparent;
        font-weight: 600;
        font-size: 16px;
        color: #474747;

        h5 {
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 10px;
            transition-duration: 500ms;

            :hover {
                color: var(--main-green);
            }
        }
    }

`;

const RecipeCard = (props) => {
    console.log(props)
    const activeTime = props.dayDifference > 0 ? props.dayDifference + " dana" : props.hourDifference > 0 ? props.hourDifference + " sati" : props.minuteDifference + " min"

    return(
        <RecipeContainer>
            <img className="card-img-top fluid" src={props.path} alt={props.name} />
            <div className="recipe-content">
                <Link className="link" to={`/recipes/${props.id}`} >
                    <h5>{props.name}</h5>
                </Link>
                {
                    props.difference && <p><small className="text-muted">Objavljeno pre:  { activeTime}
                    </small></p>
                }
            </div>
        </RecipeContainer>
    );
}

export default RecipeCard;
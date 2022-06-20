import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SmallCard = styled.div`
    display: flex;    
    margin-bottom: 50px;

    .recipe-thumb {
        margin-right: 1rem;

        img {
            width: 80px;
            height: 80px;
        }
    }

    .recipe-content {
        span {
            font-size: 12px;
            display: block;
            color: #40ba37;
        }

        h5 {
            color: #474747;
            font-size: 18px;
            margin-bottom: 5px;
            transition-duration: 500ms;
            line-height: 1.3;
            font-weight: 600;

            &:hover {
                color: var(--main-green);
            }
        }

        p {
            font-size: 12px;
            margin-bottom: 0;
            color: #9b9b9b;
        }
    }
`;

const SmallRecipeCard = (props) => {
    return(
        <div className='col-12 col-sm-6 col-lg-4'>
            <SmallCard>
                <div className='recipe-thumb'>
                    <img src={props.path} alt={props.name} />
                </div>
                <div className='recipe-content'>
                    <span>{props.date}</span>
                    <Link to={`recipes/${props.id}`}>
                        <h5>{props.name}</h5>
                    </Link>
                    <p>{props.comments} {props.comments === 1 ? 'komentar' : 'komentara'}</p>
                </div>
            </SmallCard>
        </div>
    );
}

export default SmallRecipeCard;
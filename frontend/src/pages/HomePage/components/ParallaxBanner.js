import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ParallaxBackground from '../../../assets/images/parallax-bg.jpg'
import Button from '../../../components/Button';

const ParallaxContainer = styled.div`
    background: radial-gradient(circle, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${ParallaxBackground});
    height: 60vh;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 5rem;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;

    h1 {
        font-size: 72px;
        margin-bottom: 20px;
    }

    p {
        max-width: 55%;
        margin-bottom: 50px;
        font-size: 20px;
        text-align: center;
    }
`;

const ParallaxBanner = () => {
    return(
        <ParallaxContainer>
            <h1>Posna jela</h1>
            <p>
                Veliki broj recepata za sve one koji poste, ali ne zaju koja bi posna jela spremili
            </p>
            <Button path='/recipes/fast' customStyle={{ btnWidth: '250px' }}>
                Pregledaj recepte
            </Button>
        </ParallaxContainer>
    );
}

export default ParallaxBanner;
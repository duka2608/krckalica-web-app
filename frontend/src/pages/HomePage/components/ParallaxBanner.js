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

    h1 {
        font-size: 72px;
        margin-bottom: 20px;
    }

    p {
        max-width: 55%;
        margin-bottom: 100px;
        font-size: 16px;
        text-align: center;
    }
`;

const ParallaxBanner = () => {
    return(
        <ParallaxContainer>
            <h1>Recepti za jela bez glutena</h1>
            <p>
                Fusce nec ante vitae lacus aliquet vulputate. Donec scelerisque accumsan molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras sed accumsan neque. Ut vulputate, lectus vel aliquam congue, risus leo elementum nibh
            </p>
            <Button path='/' customStyle={{ btnWidth: '250px' }}>
                Idi na recept
            </Button>
        </ParallaxContainer>
    );
}

export default ParallaxBanner;
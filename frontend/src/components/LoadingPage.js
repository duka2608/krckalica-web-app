import styled, { keyframes } from 'styled-components';

const Container = styled.div`
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid var(--main-green);
    border-top-color: var(--secondary-green);
    animation: ${spin} 1s linear infinite;
`;


const LoadingPage = () => {
    return(
        <Container>
            <Loader />
        </Container>
    );
}

export default LoadingPage;
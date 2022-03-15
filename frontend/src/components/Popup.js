import styled from 'styled-components';

const PopupContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;


`;

const PopupCard = styled.div`
    border-radius: 0.25rem;

    width: 500px;
    height: 350px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;

    h1 {
        width: 100%;
        padding: 2rem 0;
        background-color: var(--main-green);
        text-align: center;
        color: #fff;
        border-radius: 0.25rem 0.25rem 0 0 ;
    }

    p {
        margin: 3rem 0;
    }
`

const Close = styled.button`
    border: none;
    width: 50%;
    line-height: 28px;
    font-size: 22px;
    padding: 1rem 0;
`;

const Popup = (props) => {
    return(
        <PopupContainer>
            <PopupCard>
                <h1>{ props.title ? props.title : '' }</h1>
                <p>{ props.message ? props.message : 'Neka poruka' }</p>
                <Close className='btn btn-success
                ' onClick={() => props.closePopup()}>Zatvori</Close>
            </PopupCard>
        </PopupContainer>
    );
}

export default Popup;
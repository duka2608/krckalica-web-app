import styled from 'styled-components';

const ButtonWrapper = styled.button`
    
`;

const Button = (props) => {
    return(
        <ButtonWrapper>
            {props.text}
        </ButtonWrapper>
    );
}

export default Button;
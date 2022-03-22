import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonWrapper = styled(Link)`
    display: inline-block;
    width: ${ props => props.customStyle.btnWidth ? props.customStyle.btnWidth : '160px' };
    height: 60px;
    color: #fff !important;
    font-weight: 400;
    border: none;
    border-left: 3px solid var(--border-green);
    border-radius: 0;
    padding: 0 30px;
    font-size: 18px;
    line-height: 58px;
    -webkit-transition-duration: 500ms;
    transition-duration: 500ms;
    background-color: #1c8314;
    cursor: pointer;

    &:hover {
        background-color: var(--secondary-green);
    }
`;

const Button = (props) => {
    console.log(props);
    return (
      <ButtonWrapper
        to={props.path}
        className={props.btnClass ? `btn ${props.btnClass}` : "btn"}
        customStyle={props.customStyle ? props.customStyle : {}}
      >
        {props.children}
      </ButtonWrapper>
    );
}

export default Button;
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonWrapper = styled(Link)`
    display: inline-block;
    width: ${ props => props.customStyle.btnWidth ? props.customStyle.btnWidth : '160px' };
    margin: ${ props => props.customStyle.margin ? props.customStyle.margin : 0 };
    height: 60px;
    color: #fff !important;
    font-weight: 400;
    border: none;
    border-left: ${ props => props.customStyle.border ? props.customStyle.border : '3px solid var(--border-green)' };
    border-radius: 0;
    padding: 0 30px;
    font-size: 18px;
    line-height: 58px;
    -webkit-transition-duration: 500ms;
    transition-duration: 500ms;
    background-color: ${ props => props.customStyle.background ? props.customStyle.background : '#1c8314' };
    cursor: pointer;

    &:hover {
        background-color: ${ props => props.customStyle.hoverBackground ? props.customStyle.hoverBackground : 'var(--secondary-green)' };
        color: ${ props => props.customStyle.hoverColor ? props.customStyle.hoverColor : '#000' }
    }
`;


const Button = (props) => {
    return (
      <ButtonWrapper
        to={props.path}
        className={props.btnClass ? `btn ${props.btnClass}` : "btn"}
        customStyle={props.customStyle ? props.customStyle : {}}
        onClick={props.action ? (e) => {
          e.preventDefault();
          props.action();
        } : null}
      >
        {props.children}
      </ButtonWrapper>
    );
}

export default Button;
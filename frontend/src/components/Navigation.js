import styled from 'styled-components';
import logo from '../assets/images/Krckalica-logo.png';
import { useState } from 'react';

const Header = styled.header`

`;

const TopNav = styled.div`
    background-color: var(--main-green);
    padding: 10px 0px;
`;

const ImageBox = styled.div`
    margin-right: 20px;

    @media only screen and (max-width: 991px) {
        margin-right: 0px;

        img {
            width: 90%;
        }
    }

    @media only screen and (max-width: 768px) {
        img {
            width: 80%;
        }
    }
`;

const List = styled.ul`
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;

    li {
        list-style: none;
        padding: 0.2rem 0.3rem;

        a {
            display: block;
            font-size: 1.4rem;
            font-weight: 800;
        }

        a:hover {
            padding: 5px 0px;
            border-bottom: 3px solid #000;
        }

        i {
            font-size: 1rem;
            margin-left: 5px;
            color: #000;
        }
    }

    @media only screen and (max-width: 991px) {
        flex-direction: column;

        li {
            display: none;
            padding: 0.5rem 0.3rem;

            a {
                font-size: 1.2rem;
            }
        }

        .show {
            li {
                display: flex;
            }
        }
    }
`;

const BottomNav = styled.nav`
    background-color: var(--gray);
    padding: 15px 0px;
    display: flex;
    align-items: center;
`;

const SecondList = styled.ul`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    li {
        list-style: none;
        font-size: 1rem;
        font-weight: 800;

        a:hover {
            padding: 5px 0px;
            color: var(--pink);
        }
    }
`;

const ToggleButton = styled.div`
    position: absolute;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    top: 3.5%;
    right: 10%;
    width: 30px;
    height: 30px;
    cursor: pointer;
     
    span {
        width: 100%;
        height: 8px;
        background-color: #000;
        border: 2px solid #fff;
        border-radius: 10px;
    }

    @media only screen and (max-width: 991px) {
        display: flex;
    }
`;

const Navigation = () => {
    const [mobileNav, setMobileNav] = useState(false);

    const toggleMenuHandler = () => {
        setMobileNav(!mobileNav);
    }

    return(
        <Header>
            <TopNav>
                <List className='container'>
                    <ImageBox>
                        <img src={logo} alt="Krckalica logo"/>
                    </ImageBox>
                    <ToggleButton onClick={toggleMenuHandler}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </ToggleButton>
                    <li>
                        <a href="#">Recepti</a>
                    </li>
                    <li>
                        <a href="#">Kuhinje <i className="fa fa-arrow-down" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="#">Kategorije <i className="fa fa-arrow-down" aria-hidden="true"></i></a>    
                    </li>   
                    <div>
                        <input type="text" placeholder="Pretrazi" />
                    </div>
                </List>
            </TopNav>
            <BottomNav>
                <SecondList className='container'>
                    <li><a href="#">Recepti</a></li>
                    <li><a href="#">Recepti</a></li>
                    <li><a href="#">Recepti</a></li>
                </SecondList>
            </BottomNav>
        </Header>
    );
};

export default Navigation;
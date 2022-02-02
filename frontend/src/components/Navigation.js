import styled from 'styled-components';
import logo from '../assets/images/Krckalica-logo.png';
import { useState, useEffect } from 'react';
import DropdownList from './DropdownList';
import axios from 'axios';
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
        position: relative;

        p {
            display: block;
            font-size: 1.4rem;
            font-weight: 800;
            margin-bottom: 0;
            cursor: pointer;
            padding-top: 3px;
            border-bottom: 3px solid transparent;
        }

        p:hover {
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
            text-align: center;
            padding: 0.5rem 0.3rem;

            p {
                font-size: 1.2rem;   
            }

            p, 
            p:hover {
                border-bottom: none;
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
    const [mobileNav, setMobileNav] = useState(true);
    const [categoryDropdown, setCategoryDropdown] = useState(false);
    const [cuisineDropdown, setCuisineDropdown] = useState(false);
    const [categories, setCategories] = useState([]);
    const [cuisines, setCuisines] = useState([]);

    const fetchCategories = () => {
        axios.get('http://localhost:8000/api/get-categories')
            .then(function (response) {
                setCategories(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const fetchCuisines = () => {
        axios.get('http://localhost:8000/api/get-cuisines')
            .then(function (response) {
                setCuisines(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchCategories();
        fetchCuisines();
    }, []);

    const toggleMenuHandler = () => {
        setMobileNav(!mobileNav);
    }

    const closeDropdowns = () => {
        setCuisineDropdown(false);
        setCategoryDropdown(false);
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
                    {mobileNav && <>
                        <li>
                            <p>Recepti</p>
                        </li>
                        <li>
                            <p onClick={() => setCategoryDropdown(!categoryDropdown)}>Kuhinje <i className="fa fa-arrow-down" aria-hidden="true"></i></p>
                            {categoryDropdown && <DropdownList data={cuisines} closeDropdown={closeDropdowns}/>}
                        </li>
                        <li>
                            <p onClick={() => setCuisineDropdown(!cuisineDropdown)} >Kategorije <i className="fa fa-arrow-down" aria-hidden="true"></i></p> 
                            {cuisineDropdown && <DropdownList data={categories} closeDropdown={closeDropdowns} />}
                        </li>   
                        <div>
                            <input type="text" placeholder="Pretrazi" />
                        </div>
                    </>}
                </List>
            </TopNav>
            <BottomNav>
                <SecondList className='container'>
                    <li><a>Recepti</a></li>
                    <li><a>Recepti</a></li>
                    <li><a>Recepti</a></li>
                </SecondList>
            </BottomNav>
        </Header>
    );
};

export default Navigation;
import styled from 'styled-components';

const List = styled.div`
    position: absolute;
    background-color: white;
    top: 4rem;
    width: 200px;
    padding: .75rem;
    border-radius: 5px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);

    a {
        display: block;
        font-size: 1rem;
        padding: 5px 0;
    }

    a:hover {
        color: var(--pink);
    }

    @media only screen and (max-width: 991px) {
        position: initial;
        top: initial;
        box-shadow: initial;
        background-color: var(--secondary-green);
        width: 100vw;
        border-radius: initial;
        padding: 0;
        
        a { 
            padding: 10px 0px;
            border-top: 2px solid var(--border-green);
        }

        a:last-child {
            border-bottom: 2px solid var(--border-green);
        }

    }
`;

const DropdownList = (props) => {
    const categoriesDisplay = props.data.map((el) => <a href='#' key={el.id}>{el.name}</a>);

    return(
        <List onMouseLeave={() => props.closeDropdown()}>
            {categoriesDisplay}
        </List>
    );
}

export default DropdownList;
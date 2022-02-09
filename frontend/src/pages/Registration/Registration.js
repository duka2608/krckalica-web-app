import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/userActions';

const Container = styled.div`
    margin: 0 auto;
    max-width: 50%;

    h2 {
        font-size: 36px;
        color: #474747;
        margin-bottom: 30px;
        line-height: 1.3;
        font-weight: 600;
    }

    .form-group {
        margin: 20px 0px;
    }

    @media only screen and (max-width: 991px) {
        max-width: 80%;
    }
`;

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isValid, setIsValid] = useState(true);

    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        if(firstName.trim() === '') {
            setFirstNameError('Polje za ime ne sme biti prazno.');
            setIsValid(false);
        }

        if(lastName.trim() === '') {
            setLastNameError('Polje za prezime ne sme biti prazno.');
            setIsValid(false);
        }

        const newUser = {
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password
        }

        if(isValid) {
           let result = dispatch(register(newUser));
        }
    }

    return (
        <div className="px-3 py-5">
            <Container>
                <div className="row text-center">
                    <h2>Registracija</h2>
                </div>
                <div className="row">
                <form onSubmit={formSubmitHandler}>
                    <div className='form-row d-flex justify-content-between'>
                        <div className='col-md-5'>
                            <label className='text-muted' htmlFor="first-name">Ime</label>
                            <input type="text" className="form-control" id="first-name" aria-describedby="emailHelp" placeholder="Unesite ime" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            {firstNameError && <p className='text-danger mb-0'>{firstNameError}</p>}
                        </div>
                        <div className='col-md-6'>
                            <label className='text-muted' htmlFor="last-name">Prezime</label>
                            <input type="text" className="form-control" id="last-name" placeholder="Unesite prezime" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            {lastNameError && <p className='text-danger mb-0'>{lastNameError}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='text-muted' htmlFor="username">Korisničko ime</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Unesite korisničko ime" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className='text-muted' htmlFor="email">Email adresa</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Unesite email adresu" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className='text-muted' htmlFor="password">Šifra</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <button type="submit" className="btn form-btn" >
                        Pošalji
                        </button>
                    </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default Registration;
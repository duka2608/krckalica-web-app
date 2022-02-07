import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    const [locations, setLocations] = useState([]);

    const fetchLocations = () => {
        axios
          .get("http://localhost:8000/api/locations")
          .then(function (response) {
            setLocations(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      useEffect(() => {
        fetchLocations();
      }, []);

      const locationsDropdown = locations.map((location) => {
          return <option value={location.id} key={location.id}>{location.name}</option>
      });

    return (
        <div className="px-3 py-5">
            <Container>
                <div className="row text-center">
                    <h2>Registracija</h2>
                </div>
                <div className="row">
                <form>
                    <div className='form-row d-flex justify-content-between'>
                        <div className='col-md-6'>
                            <label className='text-muted' for="exampleInputEmail1">Ime</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className='col-md-6'>
                            <label className='text-muted' for="exampleInputPassword1">Prezime</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label className='text-muted' for="exampleInputEmail1">Email adresa</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div class="form-group">
                        <label className='text-muted' for="exampleInputPassword1">Šifra</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-muted" htmlFor="exampleFormControlTextarea1">Kratka biografija</label>
                        <textarea className="form-control form-textarea"id="exampleFormControlTextarea1" rows="3"
                        ></textarea>
                    </div>
                    <div className='form-group'>
                            <label className="text-muted" for="inlineFormCustomSelectPref">Lokacija</label>
                            <select className="form-control" id="inlineFormCustomSelectPref">
                                {locations && locationsDropdown}
                            </select>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <button type="submit" className="btn form-btn">
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
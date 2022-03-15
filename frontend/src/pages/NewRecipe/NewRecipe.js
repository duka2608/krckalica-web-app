import styled from "styled-components";

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

const NewRecipe = () => {
    return(
        <div className="px-3 py-5">
            <Container>
                <div className="row text-center">
                    <h2>Novi recept</h2>
                </div>
                <div className="row">
                <form>
                    <div className='form-row '>
                            <label className='text-muted' htmlFor="first-name">Naziv recepta</label>
                            <input type="text" className="form-control" id="first-name" aria-describedby="emailHelp" placeholder="Unesite naziv" />
                            {/* {firstNameError && <p className='text-danger mb-0'>{firstNameError}</p>} */}

                    </div>
                    <div className="form-inline row">
                        <div className="form-group col-md-6">
                            <label className="text-muted">
                                Kategorija
                            </label>
                            <select className="form-control">
                                <option >Hladna predjela</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="text-muted">
                                Kuhinja
                            </label>
                            <select className="form-control">
                                <option>Univerzalna</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">
                            Opis
                        </label>
                        <textarea className="form-control" placeholder="Unesite opis Vaseg recepta"></textarea>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Savet
                        </label>
                        <textarea className="form-control" placeholder="Podelite savete sa drugim korisnicima"></textarea>
                    </div>
                    <div className="form-inline row">
                        <div className="form-group col-md-4">
                            <label className="text-muted">
                                Vreme pripreme
                            </label>
                            <input type='text' className="form-control" placeholder="min"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label className='text-muted' htmlFor="last-name">Unesite broj porcija</label>
                            <input type="text" className="form-control" id="last-name" placeholder="Unesite broj porcija" />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="text-muted">
                                Posno
                            </label>
                            <input type='checkbox' className="form-check-input form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            Unesite sliku
                        </label>
                        <input type='file' className='form-control' />
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

export default NewRecipe;
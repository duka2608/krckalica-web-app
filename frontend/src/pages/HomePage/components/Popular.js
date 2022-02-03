const Popular = () => {
    return(
        <div className='col col-lg-4 py-lg-5'>
            <div className='card bg-light text-dark p-2 mb-5'>
                <div className="card-header"><h3>Najpopularniji recepti</h3></div>
                <div className="card-body">
                    <div className="row">
                    <div className="col col-md-6">A</div>
                    <div className="col col-md-6">A</div>
                    <div className="col col-md-6">A</div>
                    <div className="col col-md-6">A</div>
                    </div>
                </div>
            </div>
            <div className='card bg-light text-dark p-2'>
                <div className="card-header"><h3>Najaktivniji korisnici</h3></div>
                <div className="card-body">
                    <div className="row">
                    <div className="col col-md-6">A</div>
                    <div className="col col-md-6">A</div>
                    <div className="col col-md-6">A</div>
                    <div className="col col-md-6">A</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popular;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState('');
  const [carmodels, setCarmodels] = useState([]);

  const params = useParams();
  const id = params.id;
  const rootUrl = window.location.origin;
  const dealerUrl = rootUrl + `/djangoapp/dealer/${id}`;
  const reviewUrl = rootUrl + '/djangoapp/add_review';
  const carmodelsUrl = rootUrl + '/djangoapp/get_cars';

  const postreview = async () => {
    let name = sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname');
    if (name.includes('null')) {
      name = sessionStorage.getItem('username');
    }
    if (!model || review === '' || date === '' || year === '') {
      alert('All details are mandatory');
      return;
    }

    const modelSplit = model.split(' ');
    const makeChosen = modelSplit[0];
    const modelChosen = modelSplit.slice(1).join(' ');

    const jsoninput = JSON.stringify({
      name: name,
      dealership: Number(id),
      review: review,
      purchase: true,
      purchase_date: date,
      car_make: makeChosen,
      car_model: modelChosen,
      car_year: Number(year),
    });

    const res = await fetch(reviewUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsoninput,
    });

    const json = await res.json();
    if (json.status === 200) {
      window.location.href = window.location.origin + '/dealer/' + id;
    } else {
      alert(json.message || 'Could not post review');
    }
  };

  useEffect(() => {
    const getDealer = async () => {
      const res = await fetch(dealerUrl, { method: 'GET' });
      const retobj = await res.json();
      if (retobj.status === 200 && retobj.dealer && retobj.dealer.length > 0) {
        setDealer(retobj.dealer[0]);
      }
    };
    const getCars = async () => {
      const res = await fetch(carmodelsUrl, { method: 'GET' });
      const retobj = await res.json();
      setCarmodels(Array.from(retobj.CarModels || []));
    };
    getDealer();
    getCars();
  }, [dealerUrl, carmodelsUrl]);

  return (
    <div>
      <Header />
      <div className="container py-4" style={{ maxWidth: 760 }}>
        <h1 className="fw-bold" style={{ color: '#0b3d91' }}>{dealer.full_name}</h1>
        <textarea id="review" className="form-control my-3" rows="7" placeholder="Write your review"
          onChange={(e) => setReview(e.target.value)}></textarea>

        <div className="mb-3">
          <label className="form-label">Purchase Date</label>
          <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Car Make</label>
          <select className="form-select" name="cars" id="cars" defaultValue=""
            onChange={(e) => setModel(e.target.value)}>
            <option value="" disabled hidden>Choose Car Make and Model</option>
            {carmodels.map((carmodel) => (
              <option key={carmodel.CarMake + carmodel.CarModel}
                value={carmodel.CarMake + ' ' + carmodel.CarModel}>
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Car Year</label>
          <input type="number" className="form-control" max={2026} min={2015}
            onChange={(e) => setYear(e.target.value)} />
        </div>

        <button className="btn btn-accent" onClick={postreview}>Post Review</button>
      </div>
    </div>
  );
};

export default PostReview;

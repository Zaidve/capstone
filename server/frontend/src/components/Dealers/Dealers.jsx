import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

  const dealerUrl = '/djangoapp/get_dealers';

  const filterDealers = async (state) => {
    const url = state === 'All' ? dealerUrl : dealerUrl + '/' + state;
    const res = await fetch(url, { method: 'GET' });
    const retobj = await res.json();
    if (retobj.status === 200) {
      setDealersList(Array.from(retobj.dealers || []));
    }
  };

  const getDealers = async () => {
    const res = await fetch(dealerUrl, { method: 'GET' });
    const retobj = await res.json();
    if (retobj.status === 200) {
      const allDealers = Array.from(retobj.dealers || []);
      setStates(Array.from(new Set(allDealers.map((d) => d.state))).sort());
      setDealersList(allDealers);
    }
  };

  useEffect(() => {
    getDealers();
  }, []);

  const isLoggedIn = sessionStorage.getItem('username') != null;

  return (
    <div>
      <Header />
      <div className="container py-4">
        <h2 className="fw-bold mb-3" style={{ color: '#0b3d91' }}>Dealerships</h2>
        <table className="table table-hover table-dealers bg-white shadow-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Dealer Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Zip</th>
              <th>
                <select className="form-select form-select-sm" name="state" id="state"
                  defaultValue="" onChange={(e) => filterDealers(e.target.value)}>
                  <option value="" disabled hidden>State</option>
                  <option value="All">All States</option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </th>
              {isLoggedIn ? <th>Review Dealer</th> : null}
            </tr>
          </thead>
          <tbody>
            {dealersList.map((dealer) => (
              <tr key={dealer.id}>
                <td>{dealer.id}</td>
                <td><a href={'/dealer/' + dealer.id}>{dealer.full_name}</a></td>
                <td>{dealer.city}</td>
                <td>{dealer.address}</td>
                <td>{dealer.zip}</td>
                <td>{dealer.state}</td>
                {isLoggedIn ? (
                  <td>
                    <a className="btn btn-sm btn-accent" href={'/postreview/' + dealer.id}>Review Dealer</a>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dealers;

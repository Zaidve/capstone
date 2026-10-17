import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const sentimentIcon = {
  positive: '😊',
  neutral: '😐',
  negative: '😞',
};

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);

  const params = useParams();
  const id = params.id;
  const rootUrl = window.location.origin;
  const dealerUrl = rootUrl + `/djangoapp/dealer/${id}`;
  const reviewsUrl = rootUrl + `/djangoapp/reviews/dealer/${id}`;
  const postReviewUrl = `/postreview/${id}`;

  useEffect(() => {
    const getDealer = async () => {
      const res = await fetch(dealerUrl, { method: 'GET' });
      const retobj = await res.json();
      if (retobj.status === 200 && retobj.dealer && retobj.dealer.length > 0) {
        setDealer(retobj.dealer[0]);
      }
    };
    const getReviews = async () => {
      const res = await fetch(reviewsUrl, { method: 'GET' });
      const retobj = await res.json();
      if (retobj.status === 200) {
        if (retobj.reviews.length > 0) {
          setReviews(retobj.reviews);
        } else {
          setUnreviewed(true);
        }
      }
    };
    getDealer();
    getReviews();
  }, [dealerUrl, reviewsUrl]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="dealer-header">
          <h1>
            {dealer.full_name}
            {sessionStorage.getItem('username') ? (
              <a className="btn btn-accent ms-3 align-middle" href={postReviewUrl}>Post Review</a>
            ) : null}
          </h1>
          <h5 className="text-muted">
            {dealer.city}, {dealer.address}, Zip - {dealer.zip}, {dealer.state}
          </h5>
        </div>
        <h4 className="mt-4 mb-3">Reviews</h4>
        <div className="row g-3 pb-5">
          {reviews.length === 0 && unreviewed === false ? (
            <p>Loading Reviews....</p>
          ) : unreviewed === true ? (
            <p>No reviews yet!</p>
          ) : (
            reviews.map((review) => (
              <div className="col-md-6 col-lg-4" key={review.id}>
                <div className="review-card">
                  <div className={'sentiment sentiment-' + review.sentiment}
                    title={review.sentiment}>
                    {sentimentIcon[review.sentiment] || '😐'}
                  </div>
                  <p className="mt-2">{review.review}</p>
                  <div className="text-muted small">
                    {review.name} &middot; {review.car_make} {review.car_model} {review.car_year}
                    {review.purchase ? ' · purchased ' + review.purchase_date : ''}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dealer;

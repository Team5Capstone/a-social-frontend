import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import RatingStars from 'react-rating-stars-component';
import '../style/SensoryMap.css';
const SensoryMap = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const autocompleteRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/maps?search=${searchQuery}`
        );
        const data = await response.json();
        const filteredData = data.filter((location) =>
          location.address.toLowerCase().includes('new york city')
        );
        setMarkers(filteredData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      console.error('You must be logged in to submit a review.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/maps/${selectedMarker.id}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            rating: reviewRating,
            comment: reviewComment
          })
        }
      );
      const newReview = await response.json();
      console.log('New review:', newReview);
      const reviewsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/maps/${selectedMarker.id}/reviews`
      );
      const reviewsData = await reviewsResponse.json();
      setSelectedMarker({ ...selectedMarker, reviews: reviewsData });
      setReviewRating(0);
      setReviewComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  useEffect(() => {
    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = () => setIsMapLoaded(true);
      document.head.appendChild(script);
    };

    loadMapScript();
  }, []);

  return (
    <div className="container">
     

      <div className="map">
        <div className="search">
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
          >
            <input
              type="text"
              placeholder="Search for a location"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Autocomplete>
        </div>

        {isMapLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={mapCenter}
            zoom={12}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  <h2>{selectedMarker.name}</h2>
                  <p>{selectedMarker.address}</p>
                  <h3>Reviews:</h3>
                  {selectedMarker.reviews && selectedMarker.reviews.length > 0 ? (
                    <ul>
                      {selectedMarker.reviews.map((review) => (
                        <li key={review.id}>
                          <p>Rating: {review.rating}</p>
                          <p>Comment: {review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews available.</p>
                  )}

                  {isLoggedIn ? (
                    <form onSubmit={handleReviewSubmit}>
                      <label htmlFor="rating">
                        Rating:
                        <RatingStars
                          id="rating"
                          count={5}
                          value={reviewRating}
                          onChange={(rating) => setReviewRating(rating)}
                          size={24}
                          activeColor="#ffd700"
                        />
                      </label>
                      <br />
                      <label htmlFor="comment">
                        Comment:
                        <textarea
                          id="comment"
                          name="comment"
                          value={reviewComment}
                          onChange={(event) => setReviewComment(event.target.value)}
                          required
                        ></textarea>
                      </label>
                      <br />
                      <button type="submit">Submit Review</button>
                    </form>
                  ) : (
                    <p>You must be logged in to submit a review.</p>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default SensoryMap;






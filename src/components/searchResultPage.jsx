import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    return (
        <div className="results-page">
            <h1>Search Results</h1>
            {searchResults.length > 0 ? (
                <div className="results-list">
                    {searchResults.map((car, index) => (
                        <div key={index} className="car-item">
                            <h3>{car.model}</h3>
                            <p>{car.brand}</p>
                            <p>{car.price}</p>
                            {/* Render more details as needed */}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No cars found</p>
            )}
        </div>
    );
};

export default ResultsPage;

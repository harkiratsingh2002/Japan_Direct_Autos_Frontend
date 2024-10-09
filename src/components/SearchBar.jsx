import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'; // Import axios
import '../assets/styles/SearchBar.css';
import links from '../assets/util/links';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (e) => setSearchQuery(e.target.value);

    // Handle search submit
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            try {
                // Send POST request to backend with the search query
                const response = await axios.post(links.backendUrl + "/search-cars", {
                    searchText: searchQuery,
                    page: 1,
                    sortOption: 'default', // Replace with actual sort option
                });

                // Log the response data for debugging
                console.log('Response data:', response.data);

                // Check if the response contains data and navigate to results page
                if (response.data && response.data.length > 0) {
                    navigate('/results', { state: { searchResults: response.data } }); // Pass data to the results page
                } else {
                    console.log('No cars found in the response.');
                }
            } catch (error) {
                console.error('Error searching for cars:', error);
            }
        }
        setSearchQuery(''); // Clear search input after submission
    };

    return (
        <div className="search-bar-container">
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="search-input"
                    placeholder="Search for cars..."
                />
                <button type="submit" className="search-btn">
                    <SearchIcon sx={{ color: '#1b3142' }} />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;

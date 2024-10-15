import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import '../assets/styles/SearchBar.css';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (e) => setSearchQuery(e.target.value);

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to the results page with the search query as a URL parameter
            navigate(`/results?search=${encodeURIComponent(searchQuery.trim())}`);
        }
        setSearchQuery(''); // Clear search input after submission
        setIsExpanded(false); // Collapse the search bar after submission
    };

    // Handle click on search icon to expand the search bar
    const handleSearchIconClick = () => {
        setIsExpanded(true);
    };

    // Handle click on close icon to collapse the search bar
    const handleCloseIconClick = () => {
        setIsExpanded(false);
    };

    return (
        <div className={`search-bar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded ? (
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="search-input"
                        placeholder="Search for cars..."
                        autoFocus
                    />
                    <button type="submit" className="search-btn">
                        <SearchIcon sx={{ color: '#1b3142' }} />
                    </button>
                    <button type="button" className="close-btn" onClick={handleCloseIconClick}>
                        <CloseIcon sx={{ color: '#1b3142' }} />
                    </button>
                </form>
            ) : (
                <button className="search-icon-btn" onClick={handleSearchIconClick}>
                    <SearchIcon sx={{ color: '#1b3142' }} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;

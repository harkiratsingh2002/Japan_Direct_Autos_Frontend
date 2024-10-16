import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { List, ListItem, Box } from '@mui/material'; // Import MUI components for suggestions list
import _ from 'lodash'; // Import lodash for debouncing
import '../assets/styles/SearchBar.css';
import links from '../assets/util/links'; // Assuming the backend URL is imported from this file

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [suggestions, setSuggestions] = useState([]); // State for storing suggestions
    const navigate = useNavigate();

    // Debounced function to fetch suggestions
    const fetchSuggestions = _.debounce((value) => {
        axios
            .post(links.backendUrl + "/suggest-cars", {
                searchText: value,
            })
            .then((response) => {
                setSuggestions(response.data.suggestions); // Set suggestions for dynamic display
            })
            .catch((err) => {
                console.log("Error fetching suggestions: ", err);
            });
    }, 300); // 300ms debounce time

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value) {
            fetchSuggestions(value); // Fetch suggestions when input is not empty
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to the results page with the search query as a URL parameter
            navigate(`/results?search=${encodeURIComponent(searchQuery.trim())}`);
        }
        setSearchQuery(''); // Clear search input after submission
        setSuggestions([]); // Clear suggestions after submission
        setIsExpanded(false); // Collapse the search bar after submission
    };

    // Handle click on search icon to expand the search bar
    const handleSearchIconClick = () => {
        setIsExpanded(true);
    };

    // Handle click on close icon to collapse the search bar
    const handleCloseIconClick = () => {
        setIsExpanded(false);
        setSuggestions([]); // Clear suggestions when search bar is collapsed
    };

    return (
        <div className={`search-bar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded ? (
                <form className="search-form" onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
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

                    {/* Displaying Search Suggestions with Better Visibility */}
                    {suggestions.length > 0 && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "100%", // Position right below the input
                                left: 0,
                                right: 0,
                                zIndex: 1000,
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: 1,
                                boxShadow: 2,
                                maxHeight: 200,
                                overflowY: "auto",
                            }}
                        >
                            <List>
                                {suggestions.map((suggestion, index) => (
                                    <ListItem
                                        button
                                        key={index}
                                        onClick={() => {
                                            setSearchQuery(suggestion.name); // Set selected suggestion to searchQuery
                                            setSuggestions([]); // Clear suggestions after selection
                                            navigate(`/results?search=${encodeURIComponent(suggestion.name)}`); // Navigate to the results page
                                        }}
                                        sx={{
                                            color: "#000", // Set text color to black
                                            padding: "10px", // Add padding to make the list items easier to click
                                            "&:hover": {
                                                backgroundColor: "#f0f0f0", // Add hover effect to the suggestions
                                            },
                                        }}
                                    >
                                        {suggestion.name} - {suggestion.year} - ${suggestion.price}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
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

import { useSelector } from "react-redux";
import { ThreeDots } from 'react-loader-spinner'; // Import the ThreeDots loader
import '../assets/styles/Loading.css'; // Custom styles for the loader
import car from '../assets/images/sedan.png'; // Import your car image

const Loading = () => {
    const showLoader = useSelector((state) => state.loadingSlice.showLoader);

    return (
        <div
            style={{
                display: showLoader ? "flex" : "none",
            }}
            id="myOverlay"
        >
            {/* Container for car and loading dots */}
            <div className="car-loader-container">
                {/* Car image */}
                <div className="car">
                    <img
                        src={car} // Use curly braces to insert the imported image
                        alt="Car"
                        className="car-image"
                    />
                </div>
                {/* Three dots loading animation under the car */}
                <div className="loading-dots">
                    <ThreeDots
                        visible={true}
                        height="40" // Smaller size for the dots
                        width="40"  // Smaller size for the dots
                        color="#ffffff" // White dots
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </div>
    );
};

export default Loading;

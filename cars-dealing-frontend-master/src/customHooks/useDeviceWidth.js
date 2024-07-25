import { useState, useEffect } from 'react';

function useDeviceWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
}

export default useDeviceWidth;
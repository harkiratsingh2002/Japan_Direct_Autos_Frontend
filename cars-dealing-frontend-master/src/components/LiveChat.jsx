import React, { useEffect } from 'react';

const LiveChat = () => {
    useEffect(() => {
        // Create the script element
        const script = document.createElement('script');
        script.src = 'https://downloads-global.3cx.com/downloads/livechatandtalk/v1/callus.js';
        script.id = 'tcx-callus-js';
        script.charset = 'utf-8';
        script.defer = true;

        script.onload = () => {
            console.log('Script loaded successfully');
        };

        script.onerror = () => {
            console.error('Failed to load the script');
        };

        document.body.appendChild(script);

        fetch('/MyPhone/config/japandirectautos')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching data:', error));

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <call-us-selector phonesystem-url="https://1676.3cx.cloud" party="japandirectautos"></call-us-selector>
        </div>
    );
};

export default LiveChat;

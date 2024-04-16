import React, { useEffect } from 'react';

const UserwayWidget = () => {
  useEffect(() => {
    // Select the div where the script should be appended
    const widgetContainer = document.getElementById('userway-widget-container');

    if (widgetContainer) {
      const script = document.createElement('script');
      script.src = 'https://cdn.userway.org/widget.js';
      script.setAttribute('data-account', 'EZQlD1asVh');
      script.async = true;
      widgetContainer.appendChild(script);  

      return () => {
        if (widgetContainer.contains(script)) {
          widgetContainer.removeChild(script);
        }
      };
    }
  }, []);

  return null;
};

export default UserwayWidget;

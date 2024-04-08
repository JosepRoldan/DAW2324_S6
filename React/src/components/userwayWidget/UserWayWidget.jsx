import React, { useEffect } from 'react';

const UserwayWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.userway.org/widget.js';
    script.setAttribute('data-account', 'EZQlD1asVh');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
};

export default UserwayWidget;
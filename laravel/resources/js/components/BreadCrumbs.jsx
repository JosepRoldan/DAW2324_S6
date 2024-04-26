// resources/js/Codea.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'

export default function BreadCrumbs() {
    return (
        <div className="text-sm breadcrumbs">
            <ul>
                <li><a>Home</a></li>
                <li><a>Documents</a></li>
                <li>Add Document</li>
            </ul>
        </div>
    );
}

if (document.getElementById('breadCrumbs')) {
    createRoot(document.getElementById('breadCrumbs')).render(<BreadCrumbs />)
}
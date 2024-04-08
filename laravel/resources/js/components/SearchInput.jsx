import React from 'react';
import { createRoot } from 'react-dom/client';

export default function SearchInput() {
    return (
        <div className="relative">
            <label htmlFor="Search" className="sr-only">
                Search products:
            </label>

            <input
                type="text"
                id="Search"
                placeholder="Search..."
                className="w-full rounded-md border-gray-300 py-2.5 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>
                </button>
            </span>
        </div>
    );
}

if (document.getElementById('searchInput')) {
    createRoot(document.getElementById('searchInput')).render(<SearchInput />);
}

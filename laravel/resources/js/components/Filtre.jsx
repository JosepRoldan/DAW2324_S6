import { Fragment, useState } from 'react'
import { createRoot } from 'react-dom/client'


export default function Filtre() {


    return (
        <div className="space-y-2">
            <details
                className="overflow-hidden rounded-md sm:text-sm border-gray-300 [&_summary::-webkit-details-marker]:hidden"
            >
                <summary
                    className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                >
                    <span className="text-sm font-medium"> Category </span>

                    <span className="transition group-open:-rotate-180">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
                            <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                <input type="checkbox" id="FilterInStock" className="h-5 w-5 rounded border-gray-300" />

                                <span className="text-sm font-medium text-gray-700"> Clothes </span>
                            </label>
                        </li>

                        <li>
                            <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                <input type="checkbox" id="FilterPreOrder" className="h-5 w-5 rounded border-gray-300" />

                                <span className="text-sm font-medium text-gray-700"> Decoration </span>
                            </label>
                        </li>

                        <li>
                            <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                <input type="checkbox" id="FilterOutOfStock" className="h-5 w-5 rounded border-gray-300" />

                                <span className="text-sm font-medium text-gray-700"> Other </span>
                            </label>
                        </li>
                    </ul>
                </div>
            </details>

            <details
                className="overflow-hidden rounded-md sm:text-sm border-gray-300 [&_summary::-webkit-details-marker]:hidden"
            >
                <summary
                    className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                >
                    <span className="text-sm font-medium"> Price </span>

                    <span className="transition group-open:-rotate-180">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">

                    <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between gap-4">
                            <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">


                                <input
                                    type="number"
                                    id="FilterPriceFrom"
                                    placeholder="From"
                                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                />
                                <span className="text-sm text-gray-600">€</span>
                            </label>

                            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">


                                <input
                                    type="number"
                                    id="FilterPriceTo"
                                    placeholder="To"
                                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                />
                                <span className="text-sm text-gray-600">€</span>
                            </label>
                            <div>
                                <button className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    )
}
if (document.getElementById('filtre')) {
    createRoot(document.getElementById('filtre')).render(<Filtre />)
}
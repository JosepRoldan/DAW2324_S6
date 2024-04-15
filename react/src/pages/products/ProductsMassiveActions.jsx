import React, { useEffect, useState } from 'react';
import ButtonToggle from '../../components/ButtonToggle';
import Spinner from '../../components/Spinner';
import { usePage } from '../../contexts/PageContext';

export default function ProductsMassiveActions() {
    const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage("Products Massive Actions");
        setSteps([{ name: 'Products', href: '/products' },
        { name: 'Products Massive Actions', href: '/products-massive-actions', current: true }
        ]);
    }, [setPage, setSteps]);

    const [rowData, setRowData] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${import.meta.env.VITE_API_URL}/products`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((result) => result.json())
            .then((data) => {
                setRowData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setIsLoading(false);
            });
    }, []);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedProducts = new Set(rowData.map((product) => product.id));
            setSelectedProducts(newSelectedProducts);
        } else {
            setSelectedProducts(new Set());
        }
    };

    const handleRowClick = (id) => {
        const newSelectedProducts = new Set(selectedProducts);
        if (newSelectedProducts.has(id)) {
            newSelectedProducts.delete(id);
        } else {
            newSelectedProducts.add(id);
        }
        setSelectedProducts(newSelectedProducts);
    };

    const isSelected = (id) => selectedProducts.has(id);

    return (
        <>
            <div className="flex items-center justify-end mb-3">
                <ButtonToggle onToggle={() => { }} />
            </div>
            <div>
                {isLoading
                    ? <Spinner message='Loading Products...' />
                    : (
                        <div className="overflow-auto">
                            <table className="w-full text-left table-fixed border-collapse mb-10">
                                <thead>
                                    <tr>
                                        <th className="w-1/12 px-4 py-2 border border-gray-300">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAllClick}
                                                checked={rowData.length > 0 && selectedProducts.size === rowData.length}
                                            // Recuerda: la propiedad "indeterminate" no es soportada directamente por JSX. Se necesita manejar con refs o efectos.
                                            />
                                        </th>
                                        <th className="w-2/12 px-4 py-2 border border-gray-300">Image</th>
                                        <th className="w-3/12 px-4 py-2 border border-gray-300">Product Name</th>
                                        <th className="w-1/12 px-4 py-2 border border-gray-300">Active</th>
                                        <th className="w-2/12 px-4 py-2 border border-gray-300">Price Range</th>
                                        <th className="w-2/12 px-4 py-2 border border-gray-300">Benefits Margin</th>
                                        <th className="w-2/12 px-4 py-2 border border-gray-300">Sales Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rowData.map((product, index) => (
                                        <tr key={index} className={isSelected(product.id) ? 'bg-gray-200' : ''}>
                                            <td className="px-4 py-2 border border-gray-300">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected(product.id)}
                                                    onChange={() => handleRowClick(product.id)}
                                                />
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                <img src={product.thumb} alt="Product" style={{ width: "50px", height: "auto" }} />
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">{product.name}</td>
                                            <td className="px-4 py-2 border border-gray-300">{product.is_active ? 'Yes' : 'No'}</td>
                                            <td className="px-4 py-2 border border-gray-300">Price Range</td>
                                            <td className="px-4 py-2 border border-gray-300">{product.benefits_margin} %</td>
                                            <td className="px-4 py-2 border border-gray-300">Sales Price</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
            </div>
        </>
    );


};

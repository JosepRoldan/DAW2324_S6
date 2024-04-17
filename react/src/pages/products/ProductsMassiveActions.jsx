import React, { useEffect, useState } from 'react';
import ButtonToggle from '../../components/ButtonToggle';
import Spinner from '../../components/Spinner';
import { PriceRangeCellRenderer } from '../../components/tables/products/cellRenderers/PriceRangeCellRenderer';
import { SalesPriceCellRenderer } from '../../components/tables/products/cellRenderers/SalesPriceCellRenderer';
import { usePage } from '../../contexts/PageContext';
import { useTranslation } from "react-i18next";
import { updateMultipleProducts } from '../../api/updateMultipleProducts';

export default function ProductsMassiveActions() {
    const { t } = useTranslation();
    const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage(t("Products Massive Actions"));
        setSteps([
            { name: t('Products'), href: '/products' },
            { name: t('Products Massive Actions'), href: '/products-massive-actions', current: true }
        ]);
    }, [setPage, setSteps, t]);

    const [rowData, setRowData] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [benefitsMargin, setBenefitsMargin] = useState('');  // Nuevo estado para el margen de beneficios
    const [isActive, setIsActive] = useState('true');  // Nuevo estado para el estado activo/inactivo
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    // Cargar datos de productos
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
    }, [lastUpdated]);

    const handleRowClick = (id) => {
        const newSelectedProducts = new Set(selectedProducts);
        if (newSelectedProducts.has(id)) {
            newSelectedProducts.delete(id);
        } else {
            newSelectedProducts.add(id);
        }
        setSelectedProducts(newSelectedProducts);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedProducts = new Set(rowData.map(product => product.id));
            setSelectedProducts(newSelectedProducts);
        } else {
            setSelectedProducts(new Set());
        }
    };

    const isSelected = (id) => selectedProducts.has(id);

    function benefitsMarginValueGetter(params) {
        if (params.data.product_details && params.data.product_details.length > 0) {
            return params.data.product_details[0].benefits_margin + " %";
        }
        return null;
    }

    const handleMarginChange = (e) => {
        setBenefitsMargin(e.target.value);
    };

    const handleMassiveUpdate = () => {
        if (selectedProducts.size === 0) {
            console.log("No products selected");
            return;
        }

        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL;
        const updateData = {
            benefitsMargin: benefitsMargin,  // Asume que benefitsMargin es una variable de estado
            isActive: isActive               // Asume que isActive es una variable de estado
        };

        updateMultipleProducts(selectedProducts, updateData, token, apiUrl)
            .then(() => {
                console.log("All selected products updated successfully");
                // Aquí se actualiza el estado lastUpdated para desencadenar una recarga de datos
                setLastUpdated(Date.now());
            })
            .catch(error => {
                console.error("Error updating products", error);
            });
    };

    return (
        <>
            <div>
                {isLoading ? <Spinner message='Loading Products...' /> : (
                    <div className="overflow-auto">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', marginTop: '10px' }}>
                            <div>
                                <label htmlFor="benefitsMargin">New Benefits Margin (%): </label>
                                <input
                                    type="text"
                                    id="benefitsMargin"
                                    value={benefitsMargin}
                                    onChange={handleMarginChange}
                                    style={{ marginRight: '20px' }}
                                />
                            </div>
                            <div>
                                <label htmlFor="isActive">Product Status: </label>
                                <select
                                    value={isActive}
                                    onChange={(e) => setIsActive(e.target.value)}
                                >
                                    <option> - </option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                            <button onClick={handleMassiveUpdate}>
                                Save Changes
                            </button>
                        </div>
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
                                        <td className="px-4 py-2 border border-gray-300"><PriceRangeCellRenderer data={product} /></td>
                                        <td className="px-4 py-2 border border-gray-300">{benefitsMarginValueGetter({ data: product })}</td>
                                        <td className="px-4 py-2 border border-gray-300"><SalesPriceCellRenderer data={product} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div >
        </>
    );
};

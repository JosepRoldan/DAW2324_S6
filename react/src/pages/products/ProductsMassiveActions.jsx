import React, { useEffect, useState } from 'react';
import ButtonToggle from '../../components/ButtonToggle';
import Spinner from '../../components/Spinner';
import { PriceRangeCellRenderer } from '../../components/tables/products/cellRenderers/PriceRangeCellRenderer';
import { SalesPriceCellRenderer } from '../../components/tables/products/cellRenderers/SalesPriceCellRenderer';
import { usePage } from '../../contexts/PageContext';
import { useTranslation } from "react-i18next";
import { updateMultipleProductsActive } from '../../api/updateMultipleProductsActive';
import { updateMultipleProductMargins } from '../../api/updateMultipleProductMargins';
import SuccessMessageModal from '../../components/SuccessMessageModal';

export default function ProductsMassiveActions() {
    const { t } = useTranslation();
    const { setPage, setSteps } = usePage();
    const [isShowingMessage, setShowingMessage] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setPage(t("Products Massive Actions"));
        setSteps([
            { name: t('Products'), href: '/products' },
            { name: t('Products Massive Actions'), href: '/products-massive-actions', current: true }
        ]);
    }, [setPage, setSteps, t]);

    const handleHideModal = () => {
        setShowModal(false);
    };

    const [rowData, setRowData] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [benefitsMargin, setBenefitsMargin] = useState('');
    const [isActive, setIsActive] = useState('true');
    const [lastUpdated, setLastUpdated] = useState(Date.now());

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

    const handleIsActiveChange = (e) => {
        setIsActive(e.target.value);
    };

    const handleMassiveUpdateForActiveProducts = () => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL;
        const activeData = {
            isActive: isActive
        };
        updateMultipleProductsActive(selectedProducts, activeData, token, apiUrl)
            .then(() => {
                setLastUpdated(Date.now());
                setUpdateMessage(t(`Products updated succesfully.`));
                setShowModal(true);
            })
            .catch(error => {
                console.error("Error updating products", error);
            });
    }

    const handleMassiveUpdateForBenefitsMargin = () => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL;
        const marginData = {
            benefitsMargin: benefitsMargin
        };
        updateMultipleProductMargins(selectedProducts, marginData, token, apiUrl)
            .then(() => {
                setLastUpdated(Date.now());
                setUpdateMessage(t(`Products updated succesfully.`));
                setShowModal(true);
            })
            .catch(error => {
                console.error("Error updating products", error);
            });
    }

    return (
        <>
            <div>
                {isLoading ? <Spinner message='Loading Products...' /> : (
                    <div className="overflow-auto">
                        {showModal ? (
                            <SuccessMessageModal message={updateMessage} onHide={handleHideModal} />
                        ) : null
                        }
                        <div className="mt-4 mb-4">
                            <div className="flex items-center">
                                <label htmlFor="benefitsMargin" className="block text-sm font-medium text-gray-700 mr-2">
                                    {t("New Benefits Margin")} (%):
                                </label>
                                <input
                                    type="text"
                                    id="benefitsMargin"
                                    value={benefitsMargin}
                                    onChange={handleMarginChange}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-50 sm:text-sm border-gray-300 rounded-md mr-2"
                                />
                                <button
                                    onClick={handleMassiveUpdateForBenefitsMargin}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg">
                                    {t("Save Margin")}
                                </button>
                            </div>

                            <div className="flex items-center mt-4">
                                <label htmlFor="isActive" className="block text-sm font-medium text-gray-700 mr-2">
                                    {t("Product Status:")}
                                </label>
                                <select
                                    id="isActive"
                                    onChange={(e) => handleIsActiveChange(e)}  // Cambio aquí: asignar el manejador de eventos al select.
                                    className="block w-50 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">{t("Select status")}</option>
                                    <option value="true">{t("Active")}</option>
                                    <option value="false">{t("Inactive")}</option>
                                </select>
                                <button
                                    onClick={handleMassiveUpdateForActiveProducts}
                                    className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg">
                                    {t("Toggle Status")}
                                </button>
                            </div>

                        </div>

                        <table className="w-full text-left table-fixed border-collapse mb-10">
                            <thead>
                                <tr>
                                    <th className="w-1/12 px-4 py-2 border border-gray-300">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAllClick}
                                            checked={rowData.length > 0 && selectedProducts.size === rowData.length}
                                        />
                                    </th>
                                    <th className="w-2/12 px-4 py-2 border border-gray-300">{t("Image")}</th>
                                    <th className="w-3/12 px-4 py-2 border border-gray-300">{t("Product Name")}</th>
                                    <th className="w-1/12 px-4 py-2 border border-gray-300">{t("Active")}</th>
                                    <th className="w-2/12 px-4 py-2 border border-gray-300">{t("Price Range")}</th>
                                    <th className="w-2/12 px-4 py-2 border border-gray-300">{t("Benefits Margin")}</th>
                                    <th className="w-2/12 px-4 py-2 border border-gray-300">{t("Sales Price")}</th>
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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import AppLayout from '../../layout/AppLayout';
import Spinner from '../../components/Spinner';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";
import { usePage } from '../../contexts/PageContext';

const resources = {
    eng: {
        translation: translationEN,
    },
    cat: {
        translation: translationCA,
    },
    esp: {
        translation: translationES,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "eng",
    fallbackLng: "eng",
    interpolation: {
        escapeValue: false,
    },
});

const ProductDetailsPage = () => {
    const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage("Product Details");
        setSteps([{ name: 'Products', href: '/products' }, { name: "Product Details", href: `/products/${productId}`, current: true }]);
    }, [setPage, setSteps]);

    const { t } = useTranslation();
    const { productId } = useParams();
    const [productData, setProductData] = useState({
        product: null,
        details: [],
        images: [],
        isLoading: true,
        error: null,
        ENG_description: '',
        CAT_description: '',
        ESP_description: '',
    });

    const token = localStorage.getItem('token');

    const saveDescription = async (language) => {
        const descriptionId = `${language}_description`;
        const descriptionValue = document.getElementById(descriptionId).value;

        if (!descriptionValue) {
            alert('Please enter a description.');
            return;
        }

        try {
            const headers = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`,
            });
            const body = JSON.stringify({
                [descriptionId]: descriptionValue,
            });

            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
                method: 'PUT',
                headers: headers,
                body: body,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Description updated successfully.');
            } else {
                const errorData = await response.json();
                console.log(`Error: ${errorData.message}`);
            }
        } catch (error) {
            // Manejo de errores de red
            alert(`Error: ${error.message}`);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                });
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
                    method: 'GET',
                    headers: headers,
                });
                const data = await response.json();
                setProductData({
                    ...productData,
                    product: data,
                    details: data.product_details || [],
                    images: data.product_images || [],
                    isLoading: false,
                    ENG_description: data.ENG_description || '',
                    CAT_description: data.CAT_description || '',
                    ESP_description: data.ESP_description || '',
                });
            } catch (error) {
                setProductData({ ...productData, error, isLoading: false });
            }
        };

        fetchData();
    }, [productId]);

    const { product, details, images, isLoading, error } = productData;

    const handleDescriptionChange = (language, value) => {
        setProductData({
            ...productData,
            [`${language}_description`]: value,
        });
    };

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true,
    };

    const imageColumnDefs = [
        {
            field: 'thumb',
            headerName: 'Thumbnail',
            cellRenderer: params => `<img src="${params.value}" style="width: 50px; height: 50px;" alt="Product Image" />`,
        },
        { field: 'original', headerName: 'Original URL', sortable: true, filter: true },
    ];

    function calculateSalesPrice(priceInSubunit, benefitsMarginPercentage) {
        const benefitsMargin = benefitsMarginPercentage / 100;
        const salesPrice = priceInSubunit + (priceInSubunit * benefitsMargin);
        return (salesPrice / 100).toFixed(2) + ' €';
    }

    const SalesPriceCellRenderer = ({ data }) => {
        if (data) {
            const benefitsMargin = data.benefits_margin;
            const salesPrice = calculateSalesPrice(data.price_in_subunit, benefitsMargin);
            return <span>{salesPrice}</span>;
        }
        return <span>{t("No Price Data")}</span>;
    };

    function benefitsMarginValueGetter(params) {
        if (params.data && params.data.benefits_margin !== undefined) {
            return params.data.benefits_margin + " %";
        }
        return null;
    }

    const detailColumnDefs = [
        { field: 'name', headerName: 'Name', sortable: true, filter: true },
        { field: 'format_width', headerName: 'Width (cm)', sortable: true, filter: true },
        { field: 'format_height', headerName: 'Height (cm)', sortable: true, filter: true },
        { field: 'formatted_price', headerName: 'Price', sortable: true, filter: true },
        { valueGetter: benefitsMarginValueGetter, headerName: 'Benefits margin', sortable: true, filter: true },
        { cellRenderer: SalesPriceCellRenderer, headerName: 'Sales price', sortable: true, filter: true },
    ];

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div style={{ height: '80vh', width: '100%', overflowY: 'auto' }}>
                <div className="flex justify-between mb-4">
                    <div className="w-1/3 pr-2">
                        <label htmlFor="ENG_description" className="block text-sm font-medium text-gray-700">Product Description (English)</label>
                        <textarea
                            id="ENG_description"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter product description in English"
                            value={productData.ENG_description}
                            onChange={(e) => handleDescriptionChange('ENG', e.target.value)}
                        ></textarea>
                        <button className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => saveDescription('ENG')}>
                            Save English Description
                        </button>
                    </div>

                    <div className="w-1/3 px-2">
                        <label htmlFor="CAT_description" className="block text-sm font-medium text-gray-700">Descripció del Producte (Català)</label>
                        <textarea
                            id="CAT_description"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                            placeholder="Afegeixi la descripció del producte en Català"
                            value={productData.CAT_description}
                            onChange={(e) => handleDescriptionChange('CAT', e.target.value)}
                        ></textarea>
                        <button className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => saveDescription('CAT')}>
                            Desar Descripció en Català
                        </button>
                    </div>

                    <div className="w-1/3 pl-2">
                        <label htmlFor="ESP_description" className="block text-sm font-medium text-gray-700">Descripción del Producto (Español)</label>
                        <textarea
                            id="ESP_description"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                            placeholder="Introduzca la descripción del producto en español"
                            value={productData.ESP_description}
                            onChange={(e) => handleDescriptionChange('ESP', e.target.value)}
                        ></textarea>
                        <button className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => saveDescription('ESP')}>
                            Guardar Descripción en Español
                        </button>
                    </div>
                </div>

                <div className="ag-theme-quartz" style={{ height: '80vh', width: '100%' }}>
                    {isLoading
                        ? <Spinner message='Loading Product...' />
                        : (
                            <>
                                <h1>{product.name}</h1>
                                <AgGridReact
                                    rowData={details}
                                    columnDefs={detailColumnDefs}
                                    defaultColDef={defaultColDef}
                                    domLayout='autoHeight'
                                    pagination={true}
                                />
                            </>
                        )}
                </div>
            </div>
        </>
    );
};

export default ProductDetailsPage;

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

const steps = [
    { name: 'Products', href: '/products', current: false },
    { name: 'Product Details', href: '/', current: true },
]

const ProductDetailsPage = () => {
    const { t } = useTranslation();
    const { productId } = useParams();
    const [productData, setProductData] = useState({
        product: null,
        details: [],
        images: [],
        isLoading: true,
        error: null,
    });

    const token = localStorage.getItem('token');

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
                });
            } catch (error) {
                setProductData({ ...productData, error, isLoading: false });
            }
        };

        fetchData();
    }, [productId]);

    const { product, details, images, isLoading, error } = productData;

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
        <AppLayout Page={"Product Details"} Steps={steps}>
            <div style={{ height: '80vh', width: '100%', overflowY: 'auto' }}>
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
        </AppLayout>
    );
};

export default ProductDetailsPage;

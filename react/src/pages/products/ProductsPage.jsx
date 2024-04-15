import React, { useEffect, useState, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import ButtonFetchProductsAPI from '../../components/ButtonFetchProductsAPI';
import ButtonToggle from '../../components/ButtonToggle';
import { PriceRangeCellRenderer } from '../../components/tables/products/cellRenderers/PriceRangeCellRenderer';
import { ImageCellRenderer } from '../../components/tables/products/cellRenderers/ImageCellRenderer';
import { EditProductCellRenderer } from '../../components/tables/products/cellRenderers/EditProductCellRenderer';
import { ProductIsActiveCellRenderer } from '../../components/tables/products/cellRenderers/ProductIsActiveCellRenderer';
import { updateProductDetails } from '../../api/updateProductDetails';
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

export default function ProductsPage() {

    const { setPage, setSteps } = usePage();

    useEffect(() => {
        setPage("Products");
        setSteps([{ name: 'Products', href: '/products', current: true }]);
    }, [setPage, setSteps]);

    const { t } = useTranslation();

    const [rowData, setRowData] = useState([]);

    const [isEditable, setIsEditable] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
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

    const toggleEditable = () => setIsEditable(!isEditable);

    const defaultColDef = useMemo(() => ({
        filter: true,
        editable: isEditable,
        resizable: true,
    }), [isEditable]);

    const handleCellClicked = (event) => {
        if (event.colDef.field === 'is_active' && isEditable) {
            const newData = rowData.map((row) => {
                if (row.id === event.data.id) {
                    return { ...row, is_active: !row.is_active };
                }
                return row;
            });
            setRowData(newData);
        }
    };

    const onCellValueChanged = (event) => {
        updateProductDetails(event, token, import.meta.env.VITE_API_URL);
    };

    function calculateSalesPrice(priceInSubunit, benefitsMarginPercentage) {
        const benefitsMargin = benefitsMarginPercentage / 100;
        const salesPrice = priceInSubunit + (priceInSubunit * benefitsMargin);
        return (salesPrice / 100).toFixed(2) + ' €';
    }

    function benefitsMarginValueGetter(params) {
        if (params.data.product_details && params.data.product_details.length > 0) {
            return params.data.product_details[0].benefits_margin + " %";
        }
        return null;
    }

    const SalesPriceCellRenderer = ({ data }) => {
        if (data.product_details && data.product_details.length > 0) {
            const benefitsMargin = data.product_details[0].benefits_margin;
            const firstPrice = calculateSalesPrice(data.product_details[0].price_in_subunit, benefitsMargin);
            const lastPrice = calculateSalesPrice(data.product_details[data.product_details.length - 1].price_in_subunit, benefitsMargin);
            return <span>{firstPrice} - {lastPrice}</span>;
        }
        return <span>{t("No Price Data")}</span>;
    };

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };

    const colDefs = useMemo(() => [
        {
            field: 'priority',
            headerName: 'Priority',
            editable: defaultColDef.editable,
        },
        {
            cellRenderer: ImageCellRenderer,
            field: 'thumb',
            headerName: 'Image',
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Product Name',
            editable: false,
        },
        {
            cellRenderer: ProductIsActiveCellRenderer,
            field: 'is_active',
            headerName: 'Active',
            cellEditor: 'agCheckboxCellEditor',
            editable: defaultColDef.editable,
        },
        {
            cellRenderer: PriceRangeCellRenderer,
            headerName: 'Price Range',
            editable: false,
        },
        {
            field: 'benefits_margin',
            headerName: "Benefits Margin",
            valueGetter: benefitsMarginValueGetter,
            valueSetter: (params) => {
                if (params.data.product_details && params.data.product_details.length > 0) {
                    const newValue = parseFloat(params.newValue.replace(' %', ''));
                    if (!isNaN(newValue) && params.data.product_details[0].benefits_margin !== newValue) {
                        params.data.product_details[0].benefits_margin = newValue;
                        return true;
                    }
                }
                return false;
            },
            editable: defaultColDef.editable,
        },
        {
            cellRenderer: SalesPriceCellRenderer,
            headerName: 'Sales Price',
            editable: false,
        },
        {
            cellRenderer: EditProductCellRenderer,
            headerName: 'Actions',
            editable: false,
        }
    ], [isEditable]);

    return (
        <>
            <div className="flex items-center justify-end mb-3">
                <a href="/products-massive-actions" className="inline-block mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Massive actions
                </a>
                <ButtonToggle onToggle={toggleEditable} />
                {/* <ButtonFetchProductsAPI /> */}
            </div>
            <div className="ag-theme-quartz" style={{ width: '100%', height: '75vh' }}>
                {isLoading
                    ? <Spinner message='Loading Products...' />
                    : (
                        <>
                            <AgGridReact
                                rowData={rowData}
                                defaultColDef={defaultColDef}
                                columnDefs={colDefs}
                                pagination={true}
                                rowSelection="multiple"
                                context={{ isEditable }}
                                onCellClicked={handleCellClicked}
                                autoSizeStrategy={autoSizeStrategy}
                                onCellValueChanged={onCellValueChanged} />
                        </>
                    )}
            </div>
        </>
    );
};
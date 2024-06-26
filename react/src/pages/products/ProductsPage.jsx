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
import { usePage } from '../../contexts/PageContext';
import { useNavigate } from 'react-router-dom';


export default function ProductsPage() {
    const { t } = useTranslation();
    const { setPage, setSteps } = usePage();

    const navigate = useNavigate();

    useEffect(() => {
        setPage(t("Products"));
        setSteps([{ name: t("Products"), href: '/products', current: true }]);
    }, [setPage, setSteps, navigate, t]);

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
            headerName: t('Priority'),
            editable: defaultColDef.editable,
        },
        {
            cellRenderer: ImageCellRenderer,
            field: 'thumb',
            headerName: t('Image'),
            editable: false,
        },
        {
            field: 'name',
            headerName: t('Product Name'),
            editable: false,
        },
        {
            cellRenderer: ProductIsActiveCellRenderer,
            field: 'is_active',
            headerName: t('Active'),
            cellEditor: 'agCheckboxCellEditor',
            editable: defaultColDef.editable,
        },
        {
            cellRenderer: PriceRangeCellRenderer,
            headerName: t('Price Range'),
            editable: false,
        },
        {
            field: 'benefits_margin',
            headerName: t("Benefits Margin"),
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
            headerName: t('Sales Price'),
            editable: false,
        },
        {
            cellRenderer: EditProductCellRenderer,
            headerName: t('Actions'),
            editable: false,
        }
    ], [isEditable, t]);

    return (
        <>
            <div className="flex items-center justify-end mb-3">
                <button
                    type="button" onClick={() => navigate("/products-massive-actions")}
                    class="inline-block bg-blue-900 hover:bg-blue-800 rounded-full text-white border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950 mr-2"
                    data-twe-ripple-init>
                    {t("Massive actions")}
                </button>


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
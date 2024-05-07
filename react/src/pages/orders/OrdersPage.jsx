import React, { useEffect, useState, useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import ButtonFetchProductsAPI from "../../components/ButtonFetchProductsAPI";
import ButtonToggle from "../../components/ButtonToggle";
import { PriceRangeCellRenderer } from "../../components/tables/products/cellRenderers/PriceRangeCellRenderer";
import { ImageCellRenderer } from "../../components/tables/products/cellRenderers/ImageCellRenderer";
import { EditProductCellRenderer } from "../../components/tables/products/cellRenderers/EditProductCellRenderer";
import { ProductIsActiveCellRenderer } from "../../components/tables/products/cellRenderers/ProductIsActiveCellRenderer";
import { updateProductDetails } from "../../api/updateProductDetails";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";
import { usePage } from "../../contexts/PageContext";
import { useNavigate } from "react-router-dom";

const EditOrder = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/orders/${data.id}`);
  };
  return (
    <svg onClick={handleClick}
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
      }}
      sxmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
    </svg>
  );
};

export default function ProductsPage() {
  const { t } = useTranslation();
  const { setPage, setSteps } = usePage();

  const navigate = useNavigate();

  useEffect(() => {
    setPage(t("Orders"));
    setSteps([{ name: t("Orders"), href: "/orders", current: true }]);
  }, [setPage, setSteps, navigate, t]);

  const [rowData, setRowData] = useState([]);

  const [isEditable, setIsEditable] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setRowData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      editable: isEditable,
      resizable: true,
    }),
    [isEditable]
  );

  const autoSizeStrategy = {
    type: "fitCellContents",
  };

  const colDefs = useMemo(
    () => [
      {
        field: "number_order",
        headerName: "Order Number",
        cellRenderer: undefined,
      },
      {
        field: "name",
        headerName: "Customer Name",
        cellRenderer: undefined,
      },
      {
        field: "datetime",
        headerName: "Order Date",
      },
      {
        field: "totalPrice",
        headerName: "Total Price",
        cellRenderer: undefined,
      },
      {
        field: "orderStatus",
        headerName: "Order Status",
        cellRenderer: undefined,
      },
      {
        headerName: "Details",
        cellRenderer: EditOrder,
      },
    ],
    [isEditable, t]
  );

  return (
    <>
      <div
        className="ag-theme-quartz mt-4"
        style={{ width: "100%", height: "75vh" }}
      >
        {isLoading ? (
          <Spinner message="Loading Orders..." />
        ) : (
          <>
            <AgGridReact
              rowData={rowData}
              defaultColDef={defaultColDef}
              columnDefs={colDefs}
              pagination={true}
            />
          </>
        )}
      </div>
    </>
  );
}

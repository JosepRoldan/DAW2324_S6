import { useTranslation } from "react-i18next";

export const SalesPriceCellRenderer = ({ data }) => {
    const { t } = useTranslation();

    function calculateSalesPrice(priceInSubunit, benefitsMarginPercentage) {
        const benefitsMargin = benefitsMarginPercentage / 100;
        const salesPrice = priceInSubunit + (priceInSubunit * benefitsMargin);
        return (salesPrice / 100).toFixed(2) + ' €';
    }
    if (data.product_details && data.product_details.length > 0) {
        const benefitsMargin = data.product_details[0].benefits_margin;
        const firstPrice = calculateSalesPrice(data.product_details[0].price_in_subunit, benefitsMargin);
        const lastPrice = calculateSalesPrice(data.product_details[data.product_details.length - 1].price_in_subunit, benefitsMargin);
        return <span>{firstPrice} - {lastPrice}</span>;
    }
    return <span>{t("No Price Data")}</span>;
};
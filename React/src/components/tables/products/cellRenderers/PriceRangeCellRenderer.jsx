export const PriceRangeCellRenderer = ({ data }) => {
    if (data.product_details && data.product_details.length > 0) {
        const firstFormattedPrice = data.product_details[0].formatted_price;
        const lastFormattedPrice = data.product_details[data.product_details.length - 1].formatted_price;
        return <span>{firstFormattedPrice} - {lastFormattedPrice}</span>;
    }
    return <span>No Price Data</span>;
};
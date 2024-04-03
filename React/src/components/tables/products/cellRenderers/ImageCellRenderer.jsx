export const ImageCellRenderer = ({ data }) => {
    return <img src={data.thumb} style={{ width: 50, height: 50 }} alt={`Image for ${data.name}`} />;
};
export const updateMultipleProductMargins = async (selectedProducts, marginData, token, apiUrl) => {
    if (!selectedProducts.size) {
        console.error('No products selected');
        return;
    }

    const payload = {};

    if (marginData.benefitsMargin !== undefined) {
        const marginValue = parseFloat(marginData.benefitsMargin.replace(' %', ''));
        if (!isNaN(marginValue)) {
            payload.benefits_margin = marginValue;
        } else {
            console.error('Invalid benefits margin value');
            return;
        }
    }

    if (Object.keys(payload).length === 0) {
        console.error('No valid data provided for update');
        return;
    }

    const updatePromises = Array.from(selectedProducts).map(productId => {
        return fetch(`${apiUrl}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) throw new Error(`Failed to update product ID ${productId}`);
                return response.json();
            })
            .catch(error => {
                console.error(`Error updating product ID ${productId}`, error);
            });
    });

    Promise.all(updatePromises)
        .then(() => console.log("All selected products updated successfully"))
        .catch(error => console.error("Error updating one or more products", error));
};

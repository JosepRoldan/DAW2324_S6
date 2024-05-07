export const updateMultipleProductsActive = async (selectedProducts, activeData, token, apiUrl) => {
    if (!selectedProducts.size) {
        console.error('No products selected');
        return;
    }

    const payload = {};

    if (activeData.isActive !== undefined) {
        payload.is_active = activeData.isActive === 'true';
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

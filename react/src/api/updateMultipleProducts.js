export const updateMultipleProducts = async (selectedProducts, updates, token, apiUrl) => {
    if (!selectedProducts.size) {
        console.error('No products selected');
        return;
    }

    // Construir el objeto de carga (payload) según los datos proporcionados
    const payload = {};
    if (updates.benefitsMargin !== undefined && updates.benefitsMargin.trim() !== "") {
        const margin = parseFloat(updates.benefitsMargin);
        if (!isNaN(margin)) {
            payload.benefits_margin = margin;
        } else {
            console.error('Invalid benefits margin value');
        }
    }

    // Verificar si hay datos válidos para actualizar
    if (Object.keys(payload).length === 0) {
        console.error('No valid data provided for update');
        return;
    }

    // Actualizar cada producto seleccionado
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

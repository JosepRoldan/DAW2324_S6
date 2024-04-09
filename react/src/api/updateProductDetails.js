export const updateProductDetails = async (event, token, apiUrl) => {
    let newValue;
    let body;

    if (event.colDef.field === 'benefits_margin') {
        newValue = parseFloat(event.newValue.replace(' %', ''));
        if (!isNaN(newValue)) {
            body = JSON.stringify({ benefits_margin: newValue });
        }
    } else if (event.colDef.field === 'priority') {
        // Asumiendo que priority no necesita el reemplazo de '%'
        newValue = parseInt(event.newValue, 10); // priority debería ser un entero
        if (!isNaN(newValue)) {
            body = JSON.stringify({ priority: newValue });
        }
    }

    if (body) {
        const productDetailId = event.data.id;
        try {
            const response = await fetch(`${apiUrl}/products/${productDetailId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: body,
            });

            if (!response.ok) {
                throw new Error(`Failed to update ${event.colDef.field}`);
            }
            console.log(`${event.colDef.field} updated successfully`);
        } catch (error) {
            console.error(`Error updating ${event.colDef.field}`, error);
        }
    }
};

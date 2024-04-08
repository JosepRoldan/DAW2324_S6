export const updateProductDetails = async (event, token, apiUrl) => {
    if (event.colDef.field === 'benefits_margin') {
        const newValue = parseFloat(event.newValue.replace(' %', ''));
        if (!isNaN(newValue)) {
            const productDetailId = event.data.id;
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productDetailId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ benefits_margin: newValue }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update benefits margin');
                }
                console.log('Benefits margin updated successfully');
            } catch (error) {
                console.error('Error updating benefits margin', error);
            }
        }
    }
};
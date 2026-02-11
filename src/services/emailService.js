export const sendOrderConfirmationEmail = async (order, customer) => {
    try {
        const apiUrl = process.env.REACT_APP_API_URL || '/.netlify/functions';
        
        const response = await fetch(`${apiUrl}/send-order-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderNumber: order.orderNumber,
                customerName: customer.fullName,
                customerEmail: customer.email,
                items: order.items,
                total: order.total
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw error;
    }
};

export const sendOrderUpdateEmail = async (order, customer, oldStatus, newStatus) => {
    try {
        const apiUrl = process.env.REACT_APP_API_URL || '/.netlify/functions';
        const response = await fetch(`${apiUrl}/send-order-update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderNumber: order.orderNumber,
                customerName: customer.name,
                customerEmail: customer.email,
                status: newStatus
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error sending order update email:', error);
        throw error;
    }
};

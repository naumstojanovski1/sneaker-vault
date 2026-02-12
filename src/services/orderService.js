import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getNextOrderNumber } from './counterService';
import { validateOrderData, checkRateLimit } from '../utils/validation';

const ORDERS_COLLECTION = 'orders';

export const createOrder = async (orderData) => {
    // Rate limit: 10 orders per hour (increased from 5)
    const rateLimit = checkRateLimit('user', 5, 3600000);
    
    if (!rateLimit.allowed) {
        throw new Error('Too many orders. Please wait before placing another order.');
    }
    
    const validation = validateOrderData(orderData);
    if (!validation.isValid) {
        throw new Error(`Invalid order data: ${validation.errors.join(', ')}`);
    }
    
    const orderNumber = await getNextOrderNumber();
    const order = {
        ...orderData,
        orderNumber,
        createdAt: new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'pending',
        shippingStatus: 'not-shipped'
    };
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), order);
    return { id: docRef.id, ...order };
};

export const getOrders = async () => {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateOrderStatus = async (orderId, status) => {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    return await updateDoc(orderRef, { status, updatedAt: new Date().toISOString() });
};

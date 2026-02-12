import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ORDERS_COLLECTION = 'orders';

export const createOrder = async (orderData) => {
    const orderNumber = Date.now(); // Simple order number using timestamp
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

import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const PRODUCTS_COLLECTION = 'products';

export const getProducts = async () => {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product) => {
    return await addDoc(collection(db, PRODUCTS_COLLECTION), product);
};

export const updateProduct = async (id, product) => {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    return await updateDoc(productRef, product);
};

export const deleteProduct = async (id) => {
    return await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
};

export const bulkDeleteProducts = async (ids) => {
    await Promise.all(ids.map(id => deleteDoc(doc(db, PRODUCTS_COLLECTION, id))));
};

export const bulkUpdateProducts = async (ids, updates) => {
    await Promise.all(ids.map(id => updateDoc(doc(db, PRODUCTS_COLLECTION, id), updates)));
};

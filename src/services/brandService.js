import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getBrands = async () => {
    try {
        const brandsCol = collection(db, 'brands');
        const snapshot = await getDocs(brandsCol);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    }
};

export const addBrand = async (brandName) => {
    try {
        const brandsCol = collection(db, 'brands');
        await addDoc(brandsCol, { name: brandName, createdAt: new Date().toISOString() });
    } catch (error) {
        console.error('Error adding brand:', error);
        throw error;
    }
};

export const deleteBrand = async (brandId) => {
    try {
        await deleteDoc(doc(db, 'brands', brandId));
    } catch (error) {
        console.error('Error deleting brand:', error);
        throw error;
    }
};

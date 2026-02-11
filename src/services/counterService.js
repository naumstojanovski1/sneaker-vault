import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';

const COUNTERS_COLLECTION = 'counters';

export const getNextProductNumber = async () => {
    const counterRef = doc(db, COUNTERS_COLLECTION, 'products');
    
    try {
        const counterDoc = await getDoc(counterRef);
        
        if (!counterDoc.exists()) {
            await setDoc(counterRef, { current: 1 });
            return 'PRD-00001';
        }
        
        const current = counterDoc.data().current;
        await updateDoc(counterRef, { current: increment(1) });
        
        return `PRD-${String(current).padStart(5, '0')}`;
    } catch (error) {
        console.error('Error getting product number:', error);
        return `PRD-${Date.now()}`;
    }
};

export const getNextOrderNumber = async () => {
    const counterRef = doc(db, COUNTERS_COLLECTION, 'orders');
    
    try {
        const counterDoc = await getDoc(counterRef);
        
        if (!counterDoc.exists()) {
            await setDoc(counterRef, { current: 1 });
            return '#00001';
        }
        
        const current = counterDoc.data().current;
        await updateDoc(counterRef, { current: increment(1) });
        
        return `#${String(current).padStart(5, '0')}`;
    } catch (error) {
        console.error('Error getting order number:', error);
        return `#${Date.now()}`;
    }
};

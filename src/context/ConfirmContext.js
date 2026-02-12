import React, { createContext, useContext, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }) => {
    const [confirmState, setConfirmState] = useState(null);

    const confirm = (message) => {
        return new Promise((resolve) => {
            setConfirmState({ message, resolve });
        });
    };

    const handleConfirm = () => {
        confirmState?.resolve(true);
        setConfirmState(null);
    };

    const handleCancel = () => {
        confirmState?.resolve(false);
        setConfirmState(null);
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            {confirmState && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[400] p-6">
                    <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-xl animate-fade-in">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black uppercase mb-2">Confirm Action</h3>
                                <p className="text-gray-600">{confirmState.message}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 font-bold uppercase text-sm hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold uppercase text-sm hover:bg-red-700 transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
};

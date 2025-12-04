
import React from 'react';
import { useUI } from '../context/UIContext';
import { Modal } from './Modal';
import { Package, Truck, MapPin } from 'lucide-react';

export const OrderDetailModal: React.FC = () => {
  const { selectedOrder, closeOrder } = useUI();

  if (!selectedOrder) return null;

  return (
    <Modal isOpen={!!selectedOrder} onClose={closeOrder} title={`Order #${selectedOrder.id}`} maxWidth="max-w-2xl">
      <div className="space-y-6">
        {/* Status Bar */}
        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
            <div>
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block
                    ${selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                      selectedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}
                `}>
                    {selectedOrder.status}
                </div>
            </div>
            <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">Order Date</div>
                <div className="font-medium text-slate-800">{selectedOrder.date}</div>
            </div>
        </div>

        {/* Tracking Steps (Visual only) */}
        <div className="relative py-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
            <div className="relative z-10 flex justify-between">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
                        <Package size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Placed</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${selectedOrder.status !== 'Cancelled' ? 'bg-slate-900 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <Truck size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Shipped</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${selectedOrder.status === 'Delivered' ? 'bg-slate-900 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <MapPin size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Delivered</span>
                </div>
            </div>
        </div>

        {/* Items */}
        <div>
            <h4 className="font-bold text-slate-800 mb-4">Items ({selectedOrder.items})</h4>
            <div className="space-y-3">
                {/* Mocking items since we don't strictly have them in the simple Order type, 
                    in a real app this would come from the API */}
                {[...Array(selectedOrder.items)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                            <div>
                                <div className="text-sm font-bold text-slate-800">Product Item #{i + 1}</div>
                                <div className="text-xs text-gray-500">Qty: 1</div>
                            </div>
                        </div>
                        <div className="font-bold text-sm text-slate-800">{(selectedOrder.total / selectedOrder.items).toLocaleString()}₮</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="font-bold text-lg text-slate-800">Total Amount</span>
            <span className="font-bold text-xl text-yellow-500">{selectedOrder.total.toLocaleString()}₮</span>
        </div>
        
        <button onClick={closeOrder} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Close Details
        </button>
      </div>
    </Modal>
  );
};

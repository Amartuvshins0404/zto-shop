
import React from 'react';
import { useUI } from '../context/UIContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useUI();

  return (
    <div className="fixed top-24 right-4 z-[70] flex flex-col gap-2">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border transform transition-all animate-slide-in min-w-[300px] bg-white
            ${notification.type === 'success' ? 'border-green-100' : 
              notification.type === 'error' ? 'border-red-100' : 'border-blue-100'}
          `}
        >
            <div className={`p-1 rounded-full 
                ${notification.type === 'success' ? 'bg-green-100 text-green-600' : 
                  notification.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}
            `}>
                {notification.type === 'success' && <CheckCircle size={16} />}
                {notification.type === 'error' && <AlertCircle size={16} />}
                {notification.type === 'info' && <Info size={16} />}
            </div>
            
            <p className="flex-1 text-sm font-medium text-slate-800">{notification.message}</p>
            
            <button 
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600"
            >
                <X size={14} />
            </button>
        </div>
      ))}
    </div>
  );
};

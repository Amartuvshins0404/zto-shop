import React from 'react';
import { useUI } from '../context/UIContext';
import { Modal } from './Modal';

export const AddEventModal: React.FC = () => {
  const { isEventModalOpen, toggleEventModal } = useUI();

  return (
    <Modal isOpen={isEventModalOpen} onClose={toggleEventModal} title="Add New Event">
      <div className="space-y-4">
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Event Title</label>
            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none text-slate-900" placeholder="Meeting with supplier" />
        </div>
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Date</label>
            <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none text-slate-900" />
        </div>
        <div className="flex gap-4">
            <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">Start Time</label>
                <input type="time" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none text-slate-900" />
            </div>
            <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">End Time</label>
                <input type="time" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none text-slate-900" />
            </div>
        </div>
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Color Tag</label>
            <div className="flex gap-2">
                {['bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-red-400', 'bg-purple-400'].map(color => (
                    <button key={color} className={`w-8 h-8 rounded-full ${color} hover:opacity-80 transition-opacity ring-2 ring-transparent focus:ring-gray-300`}></button>
                ))}
            </div>
        </div>
        <div className="pt-4">
            <button onClick={toggleEventModal} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                Save Event
            </button>
        </div>
      </div>
    </Modal>
  );
};
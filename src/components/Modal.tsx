import React from 'react';
import { ModalState } from '../types';

interface ModalProps {
  modal: ModalState;
  onConfirm: () => void;
  onCancel: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onInputChange: (value: string) => void;
}

export const Modal: React.FC<ModalProps> = ({
  modal,
  onConfirm,
  onCancel,
  onKeyDown,
  onInputChange
}) => {
  if (!modal.show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">{modal.title}</h3>
        <p className="text-gray-600 mb-4">{modal.message}</p>
        
        {modal.type === 'prompt' && (
          <input
            type="text"
            value={modal.inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            placeholder="Enter name..."
            autoFocus
          />
        )}
        
        <div className="flex justify-end gap-3">
          {modal.type === 'confirm' || modal.type === 'prompt' ? (
            <>
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {modal.type === 'confirm' ? 'Delete' : 'Add'}
              </button>
            </>
          ) : (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
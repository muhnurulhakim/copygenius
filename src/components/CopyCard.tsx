import React from 'react';
import { Copy, Save, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

interface CopyCardProps {
  copy: string;
  copyType: string;
  timestamp: string;
  onDelete: () => void;
  onEdit: (text: string) => void;
}

export default function CopyCard({ copy, copyType, timestamp, onDelete, onEdit }: CopyCardProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(copy);
    toast.success('Copied to clipboard!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg relative group">
      <div className="flex justify-between items-start mb-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {copyType}
        </span>
        <span className="text-xs text-gray-500">{formatDate(timestamp)}</span>
      </div>
      <p className="text-gray-700 pr-20">{copy}</p>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
        <button 
          onClick={handleCopy}
          className="p-1 text-gray-500 hover:text-indigo-600"
          title="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
        </button>
        <button 
          onClick={() => onEdit(copy)}
          className="p-1 text-gray-500 hover:text-indigo-600 ml-1"
          title="Edit copy"
        >
          <Save className="h-4 w-4" />
        </button>
        <button 
          onClick={onDelete}
          className="p-1 text-gray-500 hover:text-red-600 ml-1"
          title="Delete"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
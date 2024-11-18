import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CopyCard from '../components/CopyCard';
import Projects from './Projects';
import Settings from './Settings';
import toast from 'react-hot-toast';

interface SavedCopyItem {
  text: string;
  copyType: string;
  timestamp: string;
}

function DashboardHome() {
  const [formData, setFormData] = useState({
    projectName: '',
    industry: '',
    targetAudience: '',
    tone: 'professional',
    copyType: 'website',
    keyPoints: '',
    language: 'en', // Add language selection
  });

  const [savedCopy, setSavedCopy] = useState<SavedCopyItem[]>([
    {
      text: 'Unlock your potential with our revolutionary solution...',
      copyType: 'Website Copy',
      timestamp: new Date().toISOString(),
    },
    {
      text: 'Experience the future of digital transformation...',
      copyType: 'Email Campaign',
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    // Show loading toast
    toast.loading("Wait for seconds...", { id: 'generateCopy' });

    try {
      // Make webhook call to Make.com
      const response = await fetch('https://hook.eu2.make.com/oferrnmp32pj69q4zkra1bhha1auqt8e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      // Add the generated copy to saved copies
      const newCopy: SavedCopyItem = {
        text: data.generatedCopy || 'Generated copy will appear here...',
        copyType: formData.copyType,
        timestamp: new Date().toISOString(),
      };

      setSavedCopy(prev => [newCopy, ...prev]);
      toast.success('Copy generated successfully!', { id: 'generateCopy' });
    } catch (error) {
      toast.error('Failed to generate copy. Please try again.', { id: 'generateCopy' });
    }
  };

  const handleDeleteCopy = (index: number) => {
    setSavedCopy(prev => prev.filter((_, i) => i !== index));
    toast.success('Copy deleted successfully!');
  };

  const handleEditCopy = (index: number, newText: string) => {
    setSavedCopy(prev => prev.map((copy, i) => i === index ? { ...copy, text: newText } : copy));
    toast.success('Copy updated successfully!');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Copy Generator</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Technology, Healthcare"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Small Business Owners"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tone of Voice
                </label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="authoritative">Authoritative</option>
                  <option value="humorous">Humorous</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Copy Type
                </label>
                <select
                  name="copyType"
                  value={formData.copyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="website">Website Copy</option>
                  <option value="email">Email Campaign</option>
                  <option value="social">Social Media Post</option>
                  <option value="ad">Advertisement</option>
                  <option value="product">Product Description</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="en">English</option>
                  <option value="id">Bahasa Indonesia</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Points to Include
              </label>
              <TextareaAutosize
                name="keyPoints"
                value={formData.keyPoints}
                onChange={handleInputChange}
                minRows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter key points or specific messages you want to include..."
              />
            </div>
            
            <button 
              onClick={handleGenerate}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Copy
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Copy</h3>
          <div className="space-y-4">
            {savedCopy.map((copy, index) => (
              <CopyCard
                key={index}
                copy={copy.text}
                copyType={copy.copyType}
                timestamp={copy.timestamp}
                onDelete={() => handleDeleteCopy(index)}
                onEdit={(newText) => handleEditCopy(index, newText)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-64">
        <div className="lg:pl-0">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, Folder } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  copyCount: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      description: "Main website copy and headlines",
      date: "2024-03-15",
      copyCount: 5
    },
    {
      id: 2,
      name: "Email Campaign",
      description: "Spring promotion series",
      date: "2024-03-10",
      copyCount: 3
    }
  ]);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Folder className="h-8 w-8 text-indigo-600" />
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>Created: {project.date}</span>
                <span>{project.copyCount} copies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
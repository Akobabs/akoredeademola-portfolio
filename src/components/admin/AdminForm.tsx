
import React from 'react';
import { Save, X } from 'lucide-react';

interface AdminFormProps {
  activeSection: string;
  formData: any;
  editingItem: any;
  onInputChange: (field: string, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const AdminForm = ({ 
  activeSection, 
  formData, 
  editingItem, 
  onInputChange, 
  onSubmit, 
  onCancel 
}: AdminFormProps) => {
  const isEditing = editingItem !== null;

  const renderFormFields = () => {
    switch (activeSection) {
      case 'routes':
        return (
          <>
            <input
              type="text"
              placeholder="Route Name"
              value={formData.name || ''}
              onChange={(e) => onInputChange('name', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Route Path"
              value={formData.path || ''}
              onChange={(e) => onInputChange('path', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => onInputChange('description', e.target.value)}
              className="w-full p-3 border rounded-lg h-24"
            />
            <input
              type="number"
              placeholder="Order"
              value={formData.order || ''}
              onChange={(e) => onInputChange('order', parseInt(e.target.value))}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
          </>
        );

      case 'skills':
        return (
          <>
            <input
              type="text"
              placeholder="Skill Name"
              value={formData.name || ''}
              onChange={(e) => onInputChange('name', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category || ''}
              onChange={(e) => onInputChange('category', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Icon (emoji)"
              value={formData.icon || ''}
              onChange={(e) => onInputChange('icon', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Subskills (comma separated)"
              value={formData.subskills || ''}
              onChange={(e) => onInputChange('subskills', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="number"
              placeholder="Proficiency (0-100)"
              value={formData.proficiency || ''}
              onChange={(e) => onInputChange('proficiency', parseInt(e.target.value))}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => onInputChange('description', e.target.value)}
              className="w-full p-3 border rounded-lg h-24"
            />
          </>
        );

      case 'blogs':
        return (
          <>
            <input
              type="text"
              placeholder="Blog Title"
              value={formData.title || ''}
              onChange={(e) => onInputChange('title', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <textarea
              placeholder="Excerpt"
              value={formData.excerpt || ''}
              onChange={(e) => onInputChange('excerpt', e.target.value)}
              className="w-full p-3 border rounded-lg h-24"
            />
            <textarea
              placeholder="Content"
              value={formData.content || ''}
              onChange={(e) => onInputChange('content', e.target.value)}
              className="w-full p-3 border rounded-lg h-32"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category || ''}
              onChange={(e) => onInputChange('category', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags || ''}
              onChange={(e) => onInputChange('tags', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="number"
              placeholder="Read Time (minutes)"
              value={formData.readTime || ''}
              onChange={(e) => onInputChange('readTime', parseInt(e.target.value))}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <select
              value={formData.status || 'draft'}
              onChange={(e) => onInputChange('status', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </>
        );

      case 'achievements':
        return (
          <>
            <input
              type="text"
              placeholder="Achievement Title"
              value={formData.title || ''}
              onChange={(e) => onInputChange('title', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => onInputChange('description', e.target.value)}
              className="w-full p-3 border rounded-lg h-24"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category || ''}
              onChange={(e) => onInputChange('category', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Organization"
              value={formData.organization || ''}
              onChange={(e) => onInputChange('organization', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => onInputChange('date', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="url"
              placeholder="URL"
              value={formData.url || ''}
              onChange={(e) => onInputChange('url', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
          </>
        );

      case 'publications':
        return (
          <>
            <input
              type="text"
              placeholder="Publication Title"
              value={formData.title || ''}
              onChange={(e) => onInputChange('title', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <textarea
              placeholder="Abstract"
              value={formData.abstract || ''}
              onChange={(e) => onInputChange('abstract', e.target.value)}
              className="w-full p-3 border rounded-lg h-24"
            />
            <input
              type="text"
              placeholder="Journal"
              value={formData.journal || ''}
              onChange={(e) => onInputChange('journal', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Authors (comma separated)"
              value={formData.authors || ''}
              onChange={(e) => onInputChange('authors', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => onInputChange('date', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="DOI"
              value={formData.doi || ''}
              onChange={(e) => onInputChange('doi', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <input
              type="url"
              placeholder="URL"
              value={formData.url || ''}
              onChange={(e) => onInputChange('url', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            />
            <select
              value={formData.status || 'draft'}
              onChange={(e) => onInputChange('status', e.target.value)}
              className="w-full p-3 border rounded-lg text-sm sm:text-base"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="under-review">Under Review</option>
            </select>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold">
            {isEditing ? 'Edit' : 'Add'} {activeSection.slice(0, -1)}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {renderFormFields()}
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Save className="h-4 w-4" />
            <span>{isEditing ? 'Update' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;

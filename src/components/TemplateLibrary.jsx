import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Eye, Download, Clock, Video } from 'lucide-react'

const TemplateLibrary = ({ templates, onSelect, onDelete, selectedTemplate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportTemplate = (template) => {
    const dataStr = JSON.stringify(template, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${template.name.replace(/\s+/g, '_')}_template.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (templates.length === 0) {
    return (
      <motion.div 
        className="card text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Templates Yet</h3>
        <p className="text-gray-500 mb-6">
          Create your first template to get started with the CapCut Template Generator
        </p>
        <motion.button
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Your First Template
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Template Library</h2>
          <span className="text-gray-600">{templates.length} templates</span>
        </div>
      </div>

      <div className="grid grid-3 gap-6">
        <AnimatePresence>
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className={`card cursor-pointer transition-all ${
                selectedTemplate?.id === template.id 
                  ? 'ring-2 ring-purple-500 bg-purple-50' 
                  : 'hover:shadow-lg'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              onClick={() => onSelect(template)}
            >
              {/* Template Preview */}
              <div 
                className="w-full h-32 rounded-lg mb-4 relative overflow-hidden"
                style={{ 
                  backgroundColor: template.backgroundColor,
                  aspectRatio: template.aspectRatio === '9:16' ? '9/16' : 
                              template.aspectRatio === '16:9' ? '16/9' : '1/1'
                }}
              >
                {template.elements.length > 0 ? (
                  <div className="absolute inset-0 p-2">
                    {template.elements.slice(0, 3).map((element, index) => (
                      <div
                        key={element.id}
                        className="absolute text-xs"
                        style={{
                          left: `${element.x}%`,
                          top: `${element.y}%`,
                          fontSize: `${Math.max(8, element.fontSize * 0.3)}px`,
                          color: element.color || '#ffffff'
                        }}
                      >
                        {element.type === 'text' ? element.content : '📷'}
                      </div>
                    ))}
                    {template.elements.length > 3 && (
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                        +{template.elements.length - 3}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Video className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg truncate">{template.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {template.duration}s
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    {template.elements.length} elements
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Created {formatDate(template.createdAt)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(template)
                  }}
                  className="btn btn-secondary flex-1 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-3 h-3" />
                  View
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    exportTemplate(template)
                  }}
                  className="btn btn-outline text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-3 h-3" />
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (window.confirm('Are you sure you want to delete this template?')) {
                      onDelete(template.id)
                    }
                  }}
                  className="btn bg-red-500 hover:bg-red-600 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default TemplateLibrary

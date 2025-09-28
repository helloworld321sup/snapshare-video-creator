import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Type, Image, Music, Save, Clock, Video } from 'lucide-react'
import DraggableText from './DraggableText'
import ColorPicker from './ColorPicker'

const TemplateCreator = ({ onSave, currentTemplate, onUpdate }) => {
  const [template, setTemplate] = useState(currentTemplate || {
    name: '',
    duration: 15,
    elements: [],
    backgroundColor: '#000000',
    aspectRatio: '9:16'
  })

  const [showColorPicker, setShowColorPicker] = useState(false)

  const addTextElement = () => {
    const newElement = {
      id: Date.now(),
      type: 'text',
      content: 'Your Text Here',
      x: 50,
      y: 50,
      fontSize: 24,
      color: '#ffffff',
      fontFamily: 'Arial',
      startTime: 0,
      endTime: template.duration,
      animation: 'fadeIn'
    }
    
    const updatedTemplate = {
      ...template,
      elements: [...template.elements, newElement]
    }
    setTemplate(updatedTemplate)
    if (onUpdate) onUpdate(updatedTemplate)
  }

  const addImageElement = () => {
    const newElement = {
      id: Date.now(),
      type: 'image',
      src: '',
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      startTime: 0,
      endTime: template.duration,
      animation: 'slideIn'
    }
    
    const updatedTemplate = {
      ...template,
      elements: [...template.elements, newElement]
    }
    setTemplate(updatedTemplate)
    if (onUpdate) onUpdate(updatedTemplate)
  }

  const updateElement = (elementId, updates) => {
    const updatedElements = template.elements.map(element =>
      element.id === elementId ? { ...element, ...updates } : element
    )
    
    const updatedTemplate = { ...template, elements: updatedElements }
    setTemplate(updatedTemplate)
    if (onUpdate) onUpdate(updatedTemplate)
  }

  const removeElement = (elementId) => {
    const updatedElements = template.elements.filter(element => element.id !== elementId)
    const updatedTemplate = { ...template, elements: updatedElements }
    setTemplate(updatedTemplate)
    if (onUpdate) onUpdate(updatedTemplate)
  }

  const handleSave = () => {
    if (!template.name.trim()) {
      alert('Please enter a template name')
      return
    }
    onSave(template)
    setTemplate({
      name: '',
      duration: 15,
      elements: [],
      backgroundColor: '#000000',
      aspectRatio: '9:16'
    })
  }

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Video className="w-5 h-5" />
        Template Creator
      </h2>

      <div className="space-y-6">
        {/* Template Settings */}
        <div className="grid grid-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Template Name</label>
            <input
              type="text"
              value={template.name}
              onChange={(e) => setTemplate({ ...template, name: e.target.value })}
              className="input"
              placeholder="Enter template name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
            <input
              type="number"
              value={template.duration}
              onChange={(e) => setTemplate({ ...template, duration: parseInt(e.target.value) || 15 })}
              className="input"
              min="1"
              max="300"
            />
          </div>
        </div>

        <div className="grid grid-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
            <select
              value={template.aspectRatio}
              onChange={(e) => setTemplate({ ...template, aspectRatio: e.target.value })}
              className="input"
            >
              <option value="9:16">9:16 (Vertical)</option>
              <option value="16:9">16:9 (Horizontal)</option>
              <option value="1:1">1:1 (Square)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={template.backgroundColor}
                onChange={(e) => setTemplate({ ...template, backgroundColor: e.target.value })}
                className="w-12 h-10 rounded border"
              />
              <input
                type="text"
                value={template.backgroundColor}
                onChange={(e) => setTemplate({ ...template, backgroundColor: e.target.value })}
                className="input flex-1"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        {/* Add Elements */}
        <div>
          <label className="block text-sm font-medium mb-3">Add Elements</label>
          <div className="flex gap-3">
            <motion.button
              onClick={addTextElement}
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Type className="w-4 h-4" />
              Add Text
            </motion.button>
            <motion.button
              onClick={addImageElement}
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image className="w-4 h-4" />
              Add Image
            </motion.button>
          </div>
        </div>

        {/* Elements List */}
        {template.elements.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-3">Elements ({template.elements.length})</label>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {template.elements.map((element) => (
                <motion.div
                  key={element.id}
                  className="bg-gray-50 p-3 rounded-lg border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">{element.type} Element</span>
                    <button
                      onClick={() => removeElement(element.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  {element.type === 'text' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={element.content}
                        onChange={(e) => updateElement(element.id, { content: e.target.value })}
                        className="input text-sm"
                        placeholder="Text content"
                      />
                      <div className="grid grid-2 gap-2">
                        <input
                          type="number"
                          value={element.fontSize}
                          onChange={(e) => updateElement(element.id, { fontSize: parseInt(e.target.value) || 24 })}
                          className="input text-sm"
                          placeholder="Font size"
                        />
                        <input
                          type="color"
                          value={element.color}
                          onChange={(e) => updateElement(element.id, { color: e.target.value })}
                          className="w-full h-8 rounded border"
                        />
                      </div>
                    </div>
                  )}
                  
                  {element.type === 'image' && (
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={element.src}
                        onChange={(e) => updateElement(element.id, { src: e.target.value })}
                        className="input text-sm"
                        placeholder="Image URL"
                      />
                      <div className="grid grid-2 gap-2">
                        <input
                          type="number"
                          value={element.width}
                          onChange={(e) => updateElement(element.id, { width: parseInt(e.target.value) || 200 })}
                          className="input text-sm"
                          placeholder="Width"
                        />
                        <input
                          type="number"
                          value={element.height}
                          onChange={(e) => updateElement(element.id, { height: parseInt(e.target.value) || 200 })}
                          className="input text-sm"
                          placeholder="Height"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          className="btn w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-4 h-4" />
          Save Template
        </motion.button>
      </div>
    </motion.div>
  )
}

export default TemplateCreator

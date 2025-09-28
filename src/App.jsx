import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import TemplateCreator from './components/TemplateCreator'
import TemplateLibrary from './components/TemplateLibrary'
import PreviewPanel from './components/PreviewPanel'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('create')
  const [templates, setTemplates] = useState([])
  const [currentTemplate, setCurrentTemplate] = useState(null)

  const addTemplate = (template) => {
    const newTemplate = {
      id: Date.now(),
      ...template,
      createdAt: new Date().toISOString()
    }
    setTemplates(prev => [...prev, newTemplate])
    setCurrentTemplate(newTemplate)
  }

  const updateTemplate = (updatedTemplate) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === updatedTemplate.id ? updatedTemplate : template
      )
    )
    setCurrentTemplate(updatedTemplate)
  }

  const deleteTemplate = (templateId) => {
    setTemplates(prev => prev.filter(template => template.id !== templateId))
    if (currentTemplate?.id === templateId) {
      setCurrentTemplate(null)
    }
  }

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container">
        <AnimatePresence mode="wait">
          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-2">
                <TemplateCreator 
                  onSave={addTemplate}
                  currentTemplate={currentTemplate}
                  onUpdate={updateTemplate}
                />
                <PreviewPanel template={currentTemplate} />
              </div>
            </motion.div>
          )}
          
          {activeTab === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TemplateLibrary 
                templates={templates}
                onSelect={setCurrentTemplate}
                onDelete={deleteTemplate}
                selectedTemplate={currentTemplate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App

import React from 'react'
import { motion } from 'framer-motion'
import { Video, Library, Sparkles } from 'lucide-react'

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'create', label: 'Create Template', icon: Video },
    { id: 'library', label: 'Template Library', icon: Library }
  ]

  return (
    <motion.header 
      className="bg-white shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CapCut Template Generator
              </h1>
              <p className="text-gray-600 text-sm">Create amazing video templates</p>
            </div>
          </div>
          
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              )
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Header

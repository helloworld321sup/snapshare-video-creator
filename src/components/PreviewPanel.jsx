import React from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Download } from 'lucide-react'

const PreviewPanel = ({ template }) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)

  React.useEffect(() => {
    let interval
    if (isPlaying && template) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= template.duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, template])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const reset = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const exportAsCapCut = () => {
    if (!template) return
    
    // Create a CapCut-compatible export format
    const capcutData = {
      version: "1.0",
      template: {
        name: template.name,
        duration: template.duration,
        aspectRatio: template.aspectRatio,
        backgroundColor: template.backgroundColor,
        tracks: [
          {
            type: "video",
            clips: [
              {
                type: "color",
                color: template.backgroundColor,
                duration: template.duration,
                startTime: 0
              }
            ]
          },
          ...template.elements.map(element => ({
            type: element.type,
            clips: [
              {
                content: element.content || element.src,
                startTime: element.startTime || 0,
                endTime: element.endTime || template.duration,
                position: { x: element.x, y: element.y },
                style: {
                  fontSize: element.fontSize,
                  color: element.color,
                  fontFamily: element.fontFamily
                },
                animation: element.animation
              }
            ]
          }))
        ]
      }
    }

    const dataStr = JSON.stringify(capcutData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${template.name.replace(/\s+/g, '_')}_capcut.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!template) {
    return (
      <motion.div 
        className="card text-center py-12"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-gray-400 mb-4">
          <Play className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Preview Panel</h3>
        <p className="text-gray-500">
          Create a template to see the preview here
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Preview</h2>
        <div className="flex gap-2">
          <motion.button
            onClick={togglePlay}
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </motion.button>
          <motion.button
            onClick={reset}
            className="btn btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Video Preview */}
      <div className="mb-6">
        <div 
          className="w-full mx-auto rounded-lg overflow-hidden relative"
          style={{ 
            backgroundColor: template.backgroundColor,
            aspectRatio: template.aspectRatio === '9:16' ? '9/16' : 
                        template.aspectRatio === '16:9' ? '16/9' : '1/1',
            maxHeight: '400px'
          }}
        >
          {/* Background */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: template.backgroundColor }}
          />
          
          {/* Elements */}
          {template.elements.map((element) => {
            const isVisible = currentTime >= (element.startTime || 0) && 
                            currentTime <= (element.endTime || template.duration)
            
            if (!isVisible) return null

            return (
              <motion.div
                key={element.id}
                className="absolute"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  fontSize: `${element.fontSize || 24}px`,
                  color: element.color || '#ffffff',
                  fontFamily: element.fontFamily || 'Arial'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {element.type === 'text' ? element.content : (
                  <div 
                    className="bg-gray-300 rounded"
                    style={{ 
                      width: `${element.width || 200}px`, 
                      height: `${element.height || 200}px` 
                    }}
                  >
                    {element.src ? (
                      <img 
                        src={element.src} 
                        alt="Element" 
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        📷
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Timeline</span>
          <span className="text-sm text-gray-600">
            {currentTime.toFixed(1)}s / {template.duration}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            style={{ 
              width: `${(currentTime / template.duration) * 100}%` 
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Template Info */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Template:</span>
          <span className="text-sm font-medium">{template.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Duration:</span>
          <span className="text-sm font-medium">{template.duration}s</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Elements:</span>
          <span className="text-sm font-medium">{template.elements.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Aspect Ratio:</span>
          <span className="text-sm font-medium">{template.aspectRatio}</span>
        </div>
      </div>

      {/* Export Button */}
      <motion.button
        onClick={exportAsCapCut}
        className="btn w-full mt-6"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Download className="w-4 h-4" />
        Export for CapCut
      </motion.button>
    </motion.div>
  )
}

export default PreviewPanel

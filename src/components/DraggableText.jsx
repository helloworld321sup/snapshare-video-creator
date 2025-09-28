import React from 'react'
import Draggable from 'react-draggable'

const DraggableText = ({ element, onUpdate, onRemove }) => {
  const handleDrag = (e, data) => {
    onUpdate({
      x: (data.x / 300) * 100, // Convert to percentage
      y: (data.y / 300) * 100
    })
  }

  return (
    <Draggable
      position={{ x: (element.x / 100) * 300, y: (element.y / 100) * 300 }}
      onDrag={handleDrag}
      bounds="parent"
    >
      <div
        className="absolute cursor-move select-none"
        style={{
          fontSize: `${element.fontSize}px`,
          color: element.color,
          fontFamily: element.fontFamily,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        {element.content}
      </div>
    </Draggable>
  )
}

export default DraggableText

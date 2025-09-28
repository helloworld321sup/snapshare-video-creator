import React from 'react'
import { HexColorPicker } from 'react-colorful'

const ColorPicker = ({ color, onChange, onClose }) => {
  return (
    <div className="absolute z-50 bg-white rounded-lg shadow-lg p-4 border">
      <HexColorPicker color={color} onChange={onChange} />
      <div className="flex gap-2 mt-3">
        <button
          onClick={onClose}
          className="btn btn-secondary text-sm"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default ColorPicker

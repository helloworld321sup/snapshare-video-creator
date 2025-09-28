# CapCut Template Generator

A modern web application for creating and managing video editing templates compatible with CapCut. This tool helps content creators design reusable templates with text overlays, images, and custom styling.

## Features

- 🎨 **Template Creator**: Design custom video templates with drag-and-drop elements
- 📚 **Template Library**: Save, organize, and manage your template collection
- 👀 **Live Preview**: Real-time preview with timeline controls
- 🎬 **CapCut Export**: Export templates in CapCut-compatible format
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **Modern UI**: Beautiful, intuitive interface with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd capcut-template-generator
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## How to Use

### Creating Templates

1. **Set Template Properties**:
   - Enter a template name
   - Set duration (1-300 seconds)
   - Choose aspect ratio (9:16, 16:9, or 1:1)
   - Select background color

2. **Add Elements**:
   - Click "Add Text" to add text overlays
   - Click "Add Image" to add image elements
   - Customize element properties (position, size, color, etc.)

3. **Preview Your Template**:
   - Use the preview panel to see your template in action
   - Play/pause the preview
   - Adjust timeline to see different moments

4. **Save Template**:
   - Click "Save Template" to add it to your library

### Managing Templates

- **View Library**: Switch to the "Template Library" tab
- **Select Template**: Click on any template to view details
- **Export**: Download templates as JSON files
- **Delete**: Remove templates you no longer need

### Exporting for CapCut

1. Select a template from your library
2. Click "Export for CapCut" in the preview panel
3. Download the JSON file
4. Import the file into CapCut (manual import may be required)

## Template Structure

Templates are stored as JSON objects with the following structure:

```json
{
  "id": "unique_id",
  "name": "Template Name",
  "duration": 15,
  "aspectRatio": "9:16",
  "backgroundColor": "#000000",
  "elements": [
    {
      "id": "element_id",
      "type": "text",
      "content": "Your Text Here",
      "x": 50,
      "y": 50,
      "fontSize": 24,
      "color": "#ffffff",
      "startTime": 0,
      "endTime": 15,
      "animation": "fadeIn"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icons
- **React Draggable**: Drag and drop functionality
- **React Colorful**: Color picker component

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions:

1. Check the browser console for errors
2. Ensure all dependencies are installed correctly
3. Try refreshing the page
4. Create an issue with detailed information about the problem

## Future Enhancements

- [ ] Audio track support
- [ ] More animation options
- [ ] Template sharing
- [ ] Cloud storage integration
- [ ] Advanced text styling
- [ ] Video background support
- [ ] Template marketplace

---

**Happy Creating!** 🎬✨

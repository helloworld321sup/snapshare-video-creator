# Setup Instructions for CapCut Template Generator

## Option 1: Install Node.js (Recommended)

### For macOS:
1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js**:
   ```bash
   brew install node
   ```

3. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```

### Alternative: Download from Official Website
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version for macOS
3. Run the installer
4. Restart your terminal

### After Node.js is installed:
1. Navigate to the project directory:
   ```bash
   cd /Users/arthurbuckley/capcut
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Option 2: Use the Standalone HTML Version

If you prefer not to install Node.js, I can create a standalone HTML version that works directly in your browser. Let me know if you'd like me to create that version instead.

## What You'll Get

Once running, you'll have a fully functional CapCut Template Generator with:

- 🎨 **Template Creator**: Design custom video templates
- 📚 **Template Library**: Save and manage templates
- 👀 **Live Preview**: Real-time preview with timeline
- 🎬 **CapCut Export**: Export templates for CapCut
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Modern UI**: Beautiful animations and interface

## Features Overview

### Template Creator
- Set template name, duration, and aspect ratio
- Choose background colors
- Add text elements with custom styling
- Add image elements with positioning
- Real-time preview

### Template Library
- View all saved templates
- Export templates as JSON files
- Delete unwanted templates
- Template preview thumbnails

### Preview Panel
- Live preview with play/pause controls
- Timeline scrubbing
- Element visibility based on timing
- Export for CapCut functionality

The application is built with modern web technologies and provides a smooth, professional user experience for creating video editing templates.

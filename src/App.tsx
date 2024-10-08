import React, { useState, useEffect } from 'react';
import { Book, Image, Type, Palette } from 'lucide-react';

function App() {
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [showImages, setShowImages] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontFamily, setFontFamily] = useState('SimSun, serif');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { 
        action: 'updateSettings',
        settings: {
          isReaderMode,
          showImages,
          fontSize,
          lineHeight,
          letterSpacing,
          fontFamily,
          backgroundColor
        }
      });
    });
  }, [isReaderMode, showImages, fontSize, lineHeight, letterSpacing, fontFamily, backgroundColor]);

  const toggleReaderMode = () => setIsReaderMode(!isReaderMode);
  const toggleShowImages = () => setShowImages(!showImages);

  return (
    <div className="w-64 p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Chinese Reader Mode</h1>
      <div className="space-y-4">
        <button
          className={`w-full py-2 px-4 rounded ${isReaderMode ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={toggleReaderMode}
        >
          <Book className="inline-block mr-2" size={18} />
          {isReaderMode ? 'Disable' : 'Enable'} Reader Mode
        </button>
        <div className="flex items-center justify-between">
          <span>Show Images</span>
          <button
            className={`py-1 px-2 rounded ${showImages ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            onClick={toggleShowImages}
          >
            <Image size={18} />
          </button>
        </div>
        <div>
          <label className="block mb-1">Font Size</label>
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Line Height</label>
          <input
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Letter Spacing</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Font Family</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full p-1 rounded"
          >
            <option value="SimSun, serif">宋体 (SimSun)</option>
            <option value="Microsoft YaHei, sans-serif">微软雅黑 (Microsoft YaHei)</option>
            <option value="KaiTi, serif">楷体 (KaiTi)</option>
            <option value="STFangsong, serif">仿宋 (FangSong)</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Background Color</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
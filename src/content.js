function applyReaderMode(settings) {
  const style = document.createElement('style');
  style.id = 'chinese-reader-mode-style';
  style.textContent = `
    body {
      font-family: ${settings.fontFamily} !important;
      font-size: ${settings.fontSize}px !important;
      line-height: ${settings.lineHeight} !important;
      letter-spacing: ${settings.letterSpacing}px !important;
      background-color: ${settings.backgroundColor} !important;
      color: ${getContrastColor(settings.backgroundColor)} !important;
    }
    img {
      display: ${settings.showImages ? 'block' : 'none'} !important;
    }
  `;
  document.head.appendChild(style);

  if (settings.isReaderMode) {
    const content = extractMainContent();
    document.body.innerHTML = `<div id="reader-mode-content">${content}</div>`;
  } else {
    const existingStyle = document.getElementById('chinese-reader-mode-style');
    if (existingStyle) existingStyle.remove();
    const readerContent = document.getElementById('reader-mode-content');
    if (readerContent) readerContent.remove();
  }
}

function extractMainContent() {
  // This is a simple content extraction algorithm. You might want to use a more sophisticated one.
  const article = document.querySelector('article') || document.querySelector('main') || document.body;
  return article.innerHTML;
}

function getContrastColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateSettings') {
    applyReaderMode(request.settings);
  }
});
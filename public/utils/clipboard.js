
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    if (!document.execCommand('copy')) {
      throw new Error(`execCommand returns false`);
    }
  } catch (err) {
    throw new Error(`Copy to clipboard failed:`, err);
  }

  document.body.removeChild(textArea);
}

/**
 * @param {string} text 
 */
export default async function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }

  return navigator.clipboard.writeText(text);
}

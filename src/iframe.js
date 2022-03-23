// inside the iframe
function saveStorageToParentStorage(key) {
  const val = localStorage.getItem(key);
  const domain = `eexReadOnly:${location.host}:${key}`;
  window.parent.postMessage({ type: 'saveToParentStorage', key: domain, val }, "*");
}

if (window.self !== window.top) {
  // insert eex helpers for iframe 
  const element = document.createElement('script');
  element.innerHTML = `window.eex={}; window.eex.saveStorageToParentStorage=${saveStorageToParentStorage};`;
  element.id = 'eexIFrameMessenger';
  document.querySelector('html').appendChild(element);
  window.addEventListener("message", (event) => {
    if (event.data.type === 'eexAppendScript' && event.data.script.length) {
      const element = document.createElement('script');
      element.innerHTML = event.data.script;
      document.querySelector('html').appendChild(element);
    }
  });
}

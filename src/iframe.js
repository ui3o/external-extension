console.log(`..iframe injector loaded..`);

// inside the iframe
if (window.self !== window.top) {
  window.addEventListener("message", (event) => {
    if (event.data.type === 'eval' && event.data.script.length){
      eval(event.data.script);
    }
  }, false);
}

# Description

This plugin made for Chrome and Firefox. It is enable to load external script from external url.

# Examples

- example for load iframe in background

```
// load iframe in background
eex.loadBackgroundIframe({ id: 'foo', src: 'http://localhost:8099/'});
```

- to receive background message possible to communicate through local storage
  - in every iframe will have **window.eex** object helper
  - work as usual with local storage in iframe and possible to sync local storage **key** with `eex.saveStorageToParentStorage('foo')`
  - these keys are auto synchronized on page load and possible to access with `eex.getItem('localhost:8099', 'foo')`
  - possible to listen these keys changes also with `eex.regStorageItemChange('localhost:8099', 'foo', (val)=>{console.log('local store change: ', val)})`
  - ```localhost:8099``` is a **domain** which come from **link** option. It use host of link. See below.

# Options

The injection settings need to be a JSON stringified array.

```
[{"link": "https://...js", "pathinclude": "/test/"}, {"link": "https://...", "pathinclude": "/test/", corsonly:true}, {"linkinclude": "https://...", "pathinclude": "/test/", corsonly:true}]
```

If `corsonly` is set, no external link will be loaded. The links just added only for CORS path, which means you can load resources from other url. Do not need to turn off the CORS in the browser! `linkinclude` also available only for CORS.

# iframe

All iframe going to have a message listener:

```
window.addEventListener("message", (event) => {
    if (event.data.type === 'eexAppendScript' && event.data.script.length){
      ...
    }
  }, false);
```

You can insert script from top:

```
document.querySelectorAll('iframe').forEach(i=>{
  i.contentWindow.postMessage({type:'eexAppendScript', script:`console.log('foo')`}, '*');
})
```

# License

MIT

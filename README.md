# Description

This plugin made for Chrome and Firefox. It is enable to load external script from extarnal url.

# Examples

* example for send and receive background message
```
// test function for background script
function testEval() {
  console.log('from content script:', msg.data)
  cPort.postMessage({answer: "My name is Bob!"});
}

// receive msg
eex.bPort.onMessage.addListener(function(msg) {
  console.log(msg)
});

// send msg
eex.bPort.postMessage({ func: eex.func2Background(testEval, 'test'), data:{question: "What is your name?"}});
```

# Options

The injection settings need to be a JSON stringified array.

```
[{"link": "https://...js", "pathinclude": "/test/"}, {"link": "https://...", "pathinclude": "/test/", corsonly:true}, {"linkinclude": "https://...", "pathinclude": "/test/", corsonly:true}]
```

If `corsonly` is set, no external link will be loaded. The links just added only for CORS path. `linkinclude` also available only for CORS. 

# Iframe

All iframe going to have a message listener:

```
window.addEventListener("message", (event) => {
    if (event.data.type === 'eval' && event.data.script.length){
      eval(event.data.script);
    }
  }, false);
```

You can evaluate script from top:

```
window.frames.WebApplicationFrame.postMessage({type:'eval', script:`document.querySelector('#item').click()`}, '*');
```

# Licesne

MIT


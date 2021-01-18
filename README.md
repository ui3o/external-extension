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
[{"link": "https://...js", "pathinclude": "/test/"}, {"link": "https://...", "pathinclude": "/test/", corsonly:true}]
```

If `corsonly` is set, no external link will be loaded. The links just added only for CORS path. 

# Licesne

MIT


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

# Licesne

MIT


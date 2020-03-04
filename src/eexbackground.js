
chrome.runtime.onConnect.addListener(
  function bsListener(cPort) {
    console.assert(cPort.name == "eex-background");
    cPort.onMessage.addListener(function (msg) {
      console.log(`%ceex-background msg received`, "color:darkviolet");
      eval(msg.func);
    });
  }
);
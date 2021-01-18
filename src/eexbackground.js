
chrome.runtime.onConnect.addListener(
  function bsListener(cPort) {
    console.assert(cPort.name == "eex-background");
    cPort.onMessage.addListener(function (msg) {
      console.log(`%ceex-background msg received`, "color:darkviolet");
      eval(msg.func);
    });
  }
);

function addOrReplaceHeader(responseHeaders, newHeaders) {
  newHeaders.forEach(function (header) {
    let headerPosition = responseHeaders.findIndex(x => x.name.toLowerCase() === header.name.toLowerCase());
    if (headerPosition > -1) {
      responseHeaders[headerPosition] = header;
    } else {
      responseHeaders.push(header);
    }
  }, this);
};

function onHeadersReceived(e) {
  let url = e.url;
  console.log(`Add CORS: ${url}`);
  let crossDomainHeaders = [
    // test here https://webbrowsertools.com/test-cors/
    // for fetch with credentials 
    //{ name: "access-control-allow-origin", value: e.initiator },
    // for fetch with redirect
    { name: "access-control-allow-origin", value: "*" },
    { name: "access-control-allow-methods", value: "*" },
    { name: "access-control-allow-headers", value: "*" },
    { name: "access-control-expose-headers", value: "*" },
    { name: "access-control-allow-credentials", value: "true" }
  ];
  addOrReplaceHeader(e.responseHeaders, crossDomainHeaders);
  return { responseHeaders: e.responseHeaders };
};

// read settings
chrome.storage.sync.get({ 'urllink': '' }, (item) => {
  const extra = ['blocking', 'responseHeaders'];
  if (/Firefox/.test(navigator.userAgent) === false) {
    extra.push('extraHeaders');
  }
  const urls = [];
  const items = JSON.parse(item.urllink);
  items.forEach(i => {
    urls.push(i.link);
    urls.push(`${i.pathinclude}*`);
  });
  chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceived,
    { urls },
    extra
  );
})

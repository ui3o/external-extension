console.log(`%ceexcore loaded`, "color:green");

window.eex = {
  bPort: chrome.runtime.connect({ name: "eex-background" }) // background port
}
const eex = window.eex;

// core function for background script
eex.func2Background = function func2Background(func, uniqueId) {
  const id = uniqueId ? uniqueId : new Date().getTime();
  return `!${func.toString()}()\n//# sourceURL=${func.name}-${id}.js`
}

// core function for content script load, example.: /src/scripts/inject.js
eex.appendContentJs = function (path, uniqueId) {
  $.ajax({
    url: path, type: 'get', crossDomain: true,
    success: function (data) {
      const id = uniqueId ? uniqueId : new Date().getTime();
      const jsName = path.replace(/(.*\/)(.*)\.js/g, "$2");
      const js = `console.log('loaded');\n${data}\n//# sourceURL=${jsName}-${id}.js`
      if (window.isoptionpage) {
        $("#success-block").css("display", "initial");
      }
      eval(js);
    },
    error: function () {
      if (window.isoptionpage) {
        $("#error-block").css("display", "initial");
      }
    }
  });
}


// load inject.js
if (!window.isoptionpage) {
  chrome.storage.sync.get({ urllink: '[]' }, function (items) {
    JSON.parse(items.urllink).forEach(path => {
      if(window.location.href.includes(path.pathinclude)) {
        eex.appendContentJs(path.link, 'boot');
      }
    });
  });
}

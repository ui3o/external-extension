// Saves options to chrome.storage
function save_options() {
    var urlLink = document.getElementById('urllink').value;
    document.querySelector("#success-block").style.display = "none";
    document.querySelector("#error-block").style.display = "none";
    setTimeout(() => {
        chrome.storage.sync.set({ urllink: urlLink }, function () {
            // Update status to let user know options were saved.
            try {
                JSON.parse(urlLink).forEach(path => {
                    if (path.link) {
                        appendContentJs(path.link, 'boot');
                    } else if (!path.corsonly) {
                        document.querySelector("#error-block").style.display = "initial";
                    }
                });
            } catch (error) {
                document.querySelector("#error-block").style.display = "initial";
            }
        });
    }, 300);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({ urllink: '' }, function (items) {
        document.getElementById('urllink').value = items.urllink;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

window.isOptionPage = true;
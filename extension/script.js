// Detect page navigation using history changes
const observeHistoryChanges = () => {
    const originalPushState = history.pushState;
    history.pushState = function () {
        originalPushState.apply(this, arguments);
        setTimeout(injectTipButtonOnPage, 500); // Handle history push
    };

    window.addEventListener('popstate', () => {
        setTimeout(injectTipButtonOnPage, 500); // Handle back/forward navigation
    });
};

// Main function to inject Tip button on profiles
function injectTipButtonOnPage() {
    window.checkForProfileHeaders(); // Call the function from platform.js
}

// Initialize the MutationObserver for DOM changes
function initializeMutationObserver() {
    const observer = new MutationObserver(() => {
        injectTipButtonOnPage();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

// Initialize the script
window.addEventListener('load', () => {
    injectTipButtonOnPage();
    observeHistoryChanges();
    initializeMutationObserver();  // Added MutationObserver to track DOM changes
});

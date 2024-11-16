// Function to add Tip button to a profile header
function addTipButtonToProfile(profileHeader) {
    if (profileHeader && !profileHeader.querySelector('.tip-button')) {
        const tipButton = window.createTipButton();

        profileHeader.appendChild(tipButton);
        tipButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the event from bubbling up

            // Extract the username from the URL
            const urlPath = window.location.pathname; // This gives the path after the domain
            const username = urlPath.split('/')[1]; // Split by '/' and take the second element

            // Get the hostname (e.g., "github" from "https://github.com")
            const hostname = window.location.hostname.split('.')[0]; // Get the subdomain before the first dot

            window.showTipModal(hostname, username);
        });
    }
}

function addTipButtonToTwitterReplies(profileHeader) {
    if (profileHeader && !profileHeader.parentElement.querySelector('.tip-button')) {
        // Create the tip button
        const tipButton = window.createSmallTipButton();

        // Add 'align-items: center' class to the parent element
        profileHeader.parentElement.style.alignItems = 'center';

        // Insert the tip button directly after the profile header
        profileHeader.parentElement.insertBefore(tipButton, profileHeader.nextSibling);

        // Add click event listener for the tip button
        tipButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling up

            // Dynamically find the span containing the username (@naruto11eth)
            const profileElement = profileHeader.closest('article'); // Adjust the selector to a higher-order parent (such as 'article')
            const usernameSpan = [...profileElement.querySelectorAll('span')].find(span => span.textContent.trim().startsWith('@'));
            
            // Retrieve the text from the username span
            const username = usernameSpan ? usernameSpan.textContent.trim().substring(1) : null; // Remove '@' from username

            // Get the hostname (e.g., "github" from "https://github.com")
            const hostname = window.location.hostname.split('.')[0]; // Get the subdomain before the first dot

            window.showTipModal(hostname, username);
        });
    }
}

// Function to add Tip button to all matched profile headers
function addTipButtonsToAllProfiles(profiles, reply) {
    profiles.forEach(profileHeader => {
        !reply ? addTipButtonToProfile(profileHeader): addTipButtonToTwitterReplies(profileHeader);
    });
}

// Function to check for platform-specific profile headers and add Tip buttons
function checkForProfileHeaders() {
    // GitHub logic: Query all matching GitHub headers and add Tip buttons
    const githubProfileHeaders = document.querySelectorAll('.vcard-fullname, .orghead .lh-condensed');
    addTipButtonsToAllProfiles(githubProfileHeaders, false);

    // Twitter logic: Query all matching Twitter headers and add Tip buttons
    const twitterProfileHeaders = document.querySelectorAll('[data-testid="UserName"]');
    addTipButtonsToAllProfiles(twitterProfileHeaders, false);

    const twitterReplies = document.querySelectorAll('[data-testid="bookmark"]');
    addTipButtonsToAllProfiles(twitterReplies, true);
}

// Expose function globally
window.checkForProfileHeaders = checkForProfileHeaders;

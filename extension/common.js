// Function to create and show the Tip modal
function showTipModal(platform, username) {
  // Create the modal container
  const modal = document.createElement("div");
  modal.style = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;

  // Create the iframe
  const iframe = document.createElement("iframe");
  iframe.src = ``; // URL of your actual Tip app
  iframe.style = `
      width: 450px; 
      height: 750px; 
      border: none; 
      border-radius: 40px; 
      background-color: transparent; 
      padding: 20px;`;

  // Create a close button that follows the cursor
  const floatingCloseButton = document.createElement("button");
  floatingCloseButton.innerText = "X";
  floatingCloseButton.style = `
      position: absolute;
      padding: 11px 20px;
      font-size: 22px;
      font-weight: 700;
      background-color: #FF605C;
      color: black;
      border: none;
      border-radius: 50px;
      font-family: sans-serif;
      z-index: 1001;
      cursor: pointer;
      transform: translate(-50%, -50%);
    `;
  
  // Append elements to modal
  modal.appendChild(iframe);
  document.body.appendChild(modal);
  document.body.appendChild(floatingCloseButton);

  // Function to close modal
  const closeModal = () => {
    document.body.removeChild(modal);
    document.body.removeChild(floatingCloseButton);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("click", handleOutsideClick);
  };

  // Update floating button position based on mouse position
  const handleMouseMove = (event) => {
    const iframeRect = iframe.getBoundingClientRect();
    const isOutsideIframe = 
      event.clientX < iframeRect.left || 
      event.clientX > iframeRect.right || 
      event.clientY < iframeRect.top || 
      event.clientY > iframeRect.bottom;

    if (isOutsideIframe) {
      floatingCloseButton.style.display = "block";
      floatingCloseButton.style.left = `${event.pageX}px`;
      floatingCloseButton.style.top = `${event.pageY}px`;
    } else {
      floatingCloseButton.style.display = "none";
    }
  };

  // Close modal when the floating button is clicked
  floatingCloseButton.onclick = closeModal;

  // Close modal when clicking outside the iframe
  const handleOutsideClick = (event) => {
    const iframeRect = iframe.getBoundingClientRect();
    const isOutsideIframe = 
      event.clientX < iframeRect.left || 
      event.clientX > iframeRect.right || 
      event.clientY < iframeRect.top || 
      event.clientY > iframeRect.bottom;

    if (isOutsideIframe) {
      closeModal();
    }
  };

  // Add event listeners
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("click", handleOutsideClick);
}

// Helper function to create Tip button
function createTipButton() {
    const tipButton = document.createElement("button");
    tipButton.innerText = "💰 Tip";
    tipButton.classList.add("tip-button"); // Add the class for styles
    return tipButton; // Return the button
}

// Helper function to create Tip button
function createSmallTipButton() {
    const tipButton = document.createElement("button");
    tipButton.innerText = "💰";
    tipButton.classList.add("tip-button", "small-tip-button"); // Add the class for styles
    tipButton.setAttribute("title", "Tip");
    return tipButton; // Return the button
}

// Expose functions globally
window.showTipModal = showTipModal;
window.createTipButton = createTipButton;
window.createSmallTipButton = createSmallTipButton;

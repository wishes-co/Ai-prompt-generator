const imageInput = document.getElementById("imageInput");
const chooseBtn = document.getElementById("chooseBtn");
const uploadBox = document.getElementById("uploadBox");
const uploadContent = document.getElementById("uploadContent");
const preview = document.getElementById("preview");
const generateBtn = document.getElementById("generateBtn");

const styleSelect = document.getElementById("styleSelect");
const promptText = document.getElementById("promptText");
const copyBtn = document.getElementById("copyBtn");
const status = document.getElementById("status");

let imageData = null;


// Choose image button
chooseBtn.addEventListener("click", function(event) {
  event.stopPropagation();
  imageInput.click();
});


// Clicking upload area
uploadBox.addEventListener("click", function() {
  imageInput.click();
});


// Image selected
imageInput.addEventListener("change", function() {

  const file = imageInput.files[0];

  if (!file) return;

  handleImage(file);
});


// Handle uploaded image
function handleImage(file) {

  if (!file.type.startsWith("image/")) {
    status.textContent = "Please upload a valid image.";
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {

    imageData = event.target.result;

    preview.src = imageData;

    preview.style.display = "block";
    uploadContent.style.display = "none";

    generateBtn.disabled = false;

    status.textContent = "Image uploaded successfully.";

  };

  reader.readAsDataURL(file);
}


// Drag and drop
uploadBox.addEventListener("dragover", function(event) {

  event.preventDefault();

  uploadBox.style.borderColor = "#8b5cf6";

});


uploadBox.addEventListener("dragleave", function() {

  uploadBox.style.borderColor = "";

});


uploadBox.addEventListener("drop", function(event) {

  event.preventDefault();

  uploadBox.style.borderColor = "";

  const file = event.dataTransfer.files[0];

  if (file) {
    handleImage(file);
  }

});


// Generate button
generateBtn.addEventListener("click", async function() {

  if (!imageData) {
    status.textContent = "Please upload an image first.";
    return;
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "✨ Analyzing...";

  status.textContent = "";

  promptText.textContent =
    "AI is analyzing your image...";

  try {

    /*
      AI API will be connected here later.

      IMPORTANT:
      Never put your private API key directly
      inside this JavaScript file.
    */

    await new Promise(resolve => setTimeout(resolve, 1500));

    promptText.textContent =
      "Your AI-generated image prompt will appear here once the secure AI backend is connected.";

    status.textContent =
      "Image ready for AI analysis.";

  }

  catch (error) {

    console.error(error);

    status.textContent =
      "Something went wrong.";

  }

  finally {

    generateBtn.disabled = false;

    generateBtn.textContent =
      "✨ Generate Prompt";

  }

});


// Copy prompt
copyBtn.addEventListener("click", async function() {

  const text = promptText.textContent;

  if (!text) return;

  try {

    await navigator.clipboard.writeText(text);

    copyBtn.textContent = "Copied!";

    setTimeout(function() {
      copyBtn.textContent = "Copy";
    }, 1500);

  }

  catch (error) {

    status.textContent =
      "Unable to copy prompt.";

  }

});

document.addEventListener("DOMContentLoaded", function () {

  // Buttons creation and event listeners
  var createButton = document.querySelector("#create");
  createButton.addEventListener("click", createMemo);

  var openButton = document.querySelector("#open");
  openButton.addEventListener("click", openMemo);

  var prevButton = document.querySelector("#prev");
  prevButton.addEventListener("click", prevMemo);

  var nextButton = document.querySelector("#next");
  nextButton.addEventListener("click", nextMemo);

  var saveButton = document.querySelector("#save");
  saveButton.addEventListener("click", saveMemo);

  var backButton = document.querySelector("#back");
  backButton.addEventListener("click", backToMainPage);

  var input = document.querySelector("#input");
  input.addEventListener("input", checkWordLimit);

  var fontSize = document.querySelector("#fontSize");
  fontSize.addEventListener("change", applySettings);

  var fontColor = document.querySelector("#fontColor");
  fontColor.addEventListener("change", applySettings);

  var bgColor = document.querySelector("#bgColor");
  bgColor.addEventListener("change", applySettings);

  // Initializations with memos and settings
  var memos = [];
  var currentMemo = 0;
  var editing = false;

  // Create new memo button logic
  function createMemo() {
    document.getElementById("mainButtons").style.display = "none";
    document.getElementById("editor").style.display = "block";
    document.getElementById("back").style.display = "block";
    memos.push({ text: "", settings: loadSettings() });
    // Set current memo to the last memo
    currentMemo = memos.length - 1;
    editing = true;
    updateMemoDisplay();
  }

  // Open memo button logic
  function openMemo() {
    document.getElementById("mainButtons").style.display = "none";
    document.getElementById("editor").style.display = "block"; 
    document.getElementById("back").style.display = "block";
    // Set current memo to the first memo
    currentMemo = 0; 
    editing = true; 
    loadSettings();
    updateMemoDisplay();
  }

  // Back to main page button logic
  function backToMainPage() {
    document.getElementById("mainButtons").style.display = "block";
    document.getElementById("editor").style.display = "none";
    document.getElementById("back").style.display = "none";
    // Clear the memo container
    document.querySelector("#memoContainer").innerHTML = '';
    editing = false;
  }

  // Previous memo button logic
  function prevMemo() {
    if (currentMemo > 0) {
      currentMemo--;
      editing = true;
      updateMemoDisplay();
    }
  }

  // Next memo button logic
  function nextMemo() {
    if (currentMemo < memos.length - 1) {
      currentMemo++;
      editing = true;
    } else if (!editing) {
      createMemo();
    }
    updateMemoDisplay();
  }

  // Save memo button logic
  function saveMemo() {
    if (editing) {
      memos[currentMemo].text = input.value;
      alert("Your memo has been saved!");
      editing = false;
    }
    updateMemoDisplay();
  }

  // Check word limit - no more than 200 words
  function checkWordLimit() {
    var words = input.value.split(" ");
    if (words.length > 200) {
      input.value = words.slice(0, 200).join(" ");
      alert("You have reached the maximum 200 words limit!");
    }
  }

  // Apply the current settings
  function applySettings() {
    var settings = loadSettings();
    settings.fontSize = fontSize.value;
    settings.fontColor = fontColor.value;
    settings.bgColor = bgColor.value;
    // Save the settings to local storage
    localStorage.setItem('settings', JSON.stringify(settings));
    updateMemoDisplay();
  }

  // Load the settings from local storage
  function loadSettings() {
    var settings = JSON.parse(localStorage.getItem('settings')) || {
      fontSize: '16',
      fontColor: 'black',
      bgColor: '#ffffff'
    };
    return settings;
  }

  // Update the memo display
  function updateMemoDisplay() {
    var settings = loadSettings();
    input.style.backgroundColor = settings.bgColor;
    input.style.color = settings.fontColor;
    input.style.fontSize = settings.fontSize + 'px';
    fontSize.value = settings.fontSize;
    fontColor.value = settings.fontColor;
    bgColor.value = settings.bgColor;
    input.value = memos[currentMemo] ? memos[currentMemo].text : '';
    input.readOnly = !editing;
    fontSize.readOnly = !editing;
    fontColor.readOnly = !editing;
    bgColor.readOnly = !editing;
    saveButton.disabled = !editing;
    prevButton.disabled = currentMemo === 0;
    nextButton.disabled = editing && currentMemo === memos.length - 1;

    var memoContainer = document.querySelector("#memoContainer");
    memoContainer.innerHTML = '';

    // Display all memos in the memo container
    for (var i = 0; i < memos.length; i++) {
      if (i === currentMemo && editing) continue;

      var memoTextarea = document.createElement("textarea");

      memoTextarea.value = memos[i].text;
      memoTextarea.style.backgroundColor = settings.bgColor;
      memoTextarea.style.color = settings.fontColor;
      memoTextarea.style.fontSize = settings.fontSize + 'px';
      memoTextarea.rows = 20; 
      memoTextarea.readOnly = true; 
      memoContainer.appendChild(memoTextarea);
    }
  }

  // Load the settings and update the memo display
  loadSettings();
  updateMemoDisplay();
});

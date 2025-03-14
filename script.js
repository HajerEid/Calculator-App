// Select the body
let body = document.body;

// Select all buttons inside .toggleBtn
let toggleBtns = document.querySelectorAll('.btn');

// Select individual theme buttons correctly
let pinkTheme = document.querySelector('.pinkTheme.btn'); 
let darkTheme = document.querySelector('.darkTheme.btn');  
let defaultTheme = document.querySelector('.defaultTheme.btn');

//main
let historybar =document.querySelector('.historybar');
let calculator =document.querySelector('.calculator');
//button
let resultInput = document.getElementById('result');
let deletebtn = document.getElementById('delete');
let buttons = document.querySelectorAll('button');
let icons = document.querySelectorAll('i');

let historyList = document.getElementById("history-list");
let p = document.querySelector('p');
let container = document.querySelector('.input-container');
// Set default theme
removeThemes()

// Function to remove all themes
function removeThemes() {
    body.classList.remove('pink', 'dark'); // Remove all themes
     toggleBtns.forEach(btn => {
         btn.classList.remove('pink','dark');
    });
    historybar.classList.remove('pink', 'dark');
    historyList.classList.remove('pink','dark');
    p.classList.remove('pink','dark');
    calculator.classList.remove('pink', 'dark');
    resultInput.classList.remove('pink', 'dark');
    deletebtn.classList.remove('pink','dark');
    buttons.forEach(btn=>{
        btn.classList.remove('pink','dark');
    });
    icons.forEach(btn=>{
        btn.classList.remove('pink','dark');
    });
    applyTheme();
    
}

// Event listener for pink theme
pinkTheme.addEventListener('click', function() {
    removeThemes(); // Remove other themes
    body.classList.add('pink'); 
     toggleBtns.forEach(btn => {
         btn.classList.add('pink');
    });
    historybar.classList.add('pink');
    historyList.classList.add('pink');
    p.classList.add('pink');
    calculator.classList.add('pink');
    resultInput.classList.add('pink');
    deletebtn.classList.add('pink');
    buttons.forEach(btn=>{
        btn.classList.add('pink');
    });
    icons.forEach(btn=>{
        btn.classList.add('pink');
    });
    applyTheme()
    
});

// Event listener for dark theme
darkTheme.addEventListener('click', function() {
    removeThemes();
    body.classList.add('dark');
    toggleBtns.forEach(btn => {
         btn.classList.add('dark');
    });
    historybar.classList.add('dark');
    historyList.classList.add('dark');
    p.classList.add('dark');
    calculator.classList.add('dark');
    resultInput.classList.add('dark');
    deletebtn.classList.add('dark');
    buttons.forEach(btn=>{
        btn.classList.add('dark');
    });
    icons.forEach(btn=>{
        btn.classList.add('dark');
    });
    applyTheme();
    
});

// Function to apply theme to created elements
function applyTheme() {
    let opericon = document.querySelector('.input-container #inputOper i');
   let historyEle = document.querySelectorAll('.expression, hr')
    if (opericon || historyEle) {
        // Remove old themes
        if (opericon) opericon.classList.remove('pink', 'dark');
       historyEle.forEach(element => {
            element.classList.remove('pink', 'dark');
        });

       
        // Apply the correct theme
        if (document.body.classList.contains('pink')) {
            if (opericon) opericon.classList.add('pink');
            historyEle.forEach(element => {
            element.classList.add('pink');
        });

        } else if (document.body.classList.contains('dark')) {
            if (opericon) opericon.classList.add('dark');
            historyEle.forEach(element => {
            element.classList.add('dark');
        });
        }
    }
}
applyTheme();
// Event listener for green theme (Reset to default)
defaultTheme.addEventListener('click', function() {
    removeThemes(); // Removes pink/dark, leaving default green
});

//switch 'number/history' tab 
let calculatorbar = document.querySelector('.calculator');
let historybtn = document.getElementById('history');
let backbtn = document.getElementById('back');

historybtn.addEventListener('click', function(){
        historybar.classList.remove('none');
        calculator.classList.add('none');
        applyTheme();
});
backbtn.addEventListener('click', function(){
        historybar.classList.add('none');
        calculator.classList.remove('none');
});

//**add values** 
// Prevent keyboard input
resultInput.addEventListener("keydown", function (event) {
    event.preventDefault(); // Stops any key input
});


//get input from buttons board
buttons.forEach(button => {
    button.addEventListener('click', function() {
        resultInput.classList.remove('resultIs'); // Remove result class

       resultInput.value += this.value;

        // Move the cursor to the end
        resultInput.focus();
        resultInput.setSelectionRange(resultInput.value.length, resultInput.value.length);
    });
});
//show operation to screen 
let inputOper = document.getElementById('inputOper');
let operation = document.querySelectorAll('.operation');

operation.forEach(button => {
    button.addEventListener('click', function() {
        let icon = this.querySelector('i'); // Get the icon inside the button
        inputOper.innerHTML = icon.outerHTML; // Insert the actual icon inside div
    });
});


// Function to calculate the result
function calculateResult() {
    let expression = resultInput.value; // Store the original expression for history

    // Replace symbols for calculation
    let formattedExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '/100');

    // Check if the input is empty or ends with an operator (to avoid errors)
    if (!formattedExpression || /[+\-*/]$/.test(formattedExpression)) {
        resultInput.value = "Error";
        return;
    }

    try {
        let result = eval(formattedExpression); // Evaluate the math expression
        resultInput.value = result; // Display the result
        resultInput.classList.add('resultIs');

        // Save the full operation in history
        saveTolocalStorage(expression, result);
    } catch (error) {
        resultInput.value = "Error";
    }
}
// Add event listener to "=" button
equals.addEventListener('click', calculateResult);


//** Select history list container

// Function to save a history item in **localStorage**
function saveTolocalStorage(expression, result) {
    let historyData = JSON.parse(localStorage.getItem("history")) || [];
    
    let newEntry = { expression, result };
    historyData.push(newEntry);
    localStorage.setItem("history", JSON.stringify(historyData));

    saveToHistory(newEntry.expression, newEntry.result); // Pass separately
}

// Function to display history in the UI (create item)
function saveToHistory(expression, result) {
    let newHistoryItem = document.createElement("li");
    newHistoryItem.innerHTML = `
        <div class="history-item">
            <div>
                <!-- Display operation -->
                <div class="expression">${expression}</div>
                
                 <!-- Display result -->
                <div>= ${result}</div>   
            </div>
            <button class="delete-history">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
        <hr>
    `;

    historyList.appendChild(newHistoryItem);

    // Add event listener to delete button
    newHistoryItem.querySelector(".delete-history").addEventListener("click", function () {
        let confirmDelete = confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            removeFromLocalStorage(expression, result);
            newHistoryItem.remove(); // Remove from UI
        }
        
    });
}

// Function to *remove* a specific item from localStorage
function removeFromLocalStorage(expression, result) {
    let historyData = JSON.parse(localStorage.getItem("history")) || [];
    historyData = historyData.filter(item => item.expression !== expression || item.result !== result);
    localStorage.setItem("history", JSON.stringify(historyData));
}

// Function to inital history (from localStorage)
function loadHistory() {
    let historyData = JSON.parse(localStorage.getItem("history")) || [];
    historyData.forEach(item => saveToHistory(item.expression, item.result));
}
loadHistory();

// Delete all history and clear localStorage
let deleteAllbtn = document.getElementById('deleteAll');
deleteAllbtn.addEventListener("click", function () {
    let confirmDeleteAll = confirm("Are you sure you want to delete all history?");
    if (confirmDeleteAll) {
        localStorage.removeItem("history"); // Clear localStorage
        historyList.innerHTML = ""; // Clear UI
    }
    
});


//clear all text in input area
let clear = document.getElementById('clear');
clear.addEventListener('click', function() {
     resultInput.value = "";
     inputOper.innerHTML = "";
});
//delete item in input area 
deletebtn.addEventListener('click', function() {
    console.log('delete clicked!')
    resultInput.value = resultInput.value.slice(0, -1); // Remove last character
});

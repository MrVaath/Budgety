// BUDGET CONTROLLER
var budgetController = (function() {
  // Some code
})();

// UI CONTROLLER
var UIController = (function() {
  // Some code
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var ctrlAddItem = function() {
    // Get the field input data
    // Add the item to the budget controller
    // Add the new item to the UI
    // Calculate the budget
    // Display the budget
    console.log('It works');
  };
  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);

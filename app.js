// BUDGET CONTROLLER
var budgetController = (function() {
  // Some code
})();

// UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  // Set up event function
  var setUpEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  // Add item function
  var ctrlAddItem = function() {
    // Get the field input data
    var input = UICtrl.getInput();
    // Add the item to the budget controller
    // Add the new item to the UI
    // Calculate the budget
    // Display the budget
  };

  return {
    init: function() {
      console.log('App has started');
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();

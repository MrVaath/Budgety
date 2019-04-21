// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    calculateBudget: function() {
      // Calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
    }
  };
})();

// UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        // parseFloat simply change string to float type
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;

      // Create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;

        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;

        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;

      // List of fields
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      );

      // Create copy of array on fields (using call method) -> simply assigning a list to the array
      fieldsArr = Array.prototype.slice.call(fields);

      // Clear all value from inputs
      fieldsArr.forEach(function(current, index, array) {
        current.value = '';
      });

      // Focus on description input
      fieldsArr[0].focus();
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

  var updateBudget = function() {
    // Calculate the budget
    budgetCtrl.calculateBudget();

    // Return the budget
    var budget = budgetCtrl.getBudget();

    // Display the budget
    console.log(budget);
  };

  // Add item function
  var ctrlAddItem = function() {
    var input, newItem;

    // Get the field input data
    input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // Add the new item to the UI
      UICtrl.addListItem(newItem, input.type);

      // Clear the fields
      UICtrl.clearFields();

      // Calculate and update budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log('App has started');
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();

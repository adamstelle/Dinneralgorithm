$(function() {
  function FoodItem(foodname, calories, group) {
    this.foodname = foodname;
    this.calories = calories;
    this.group    = group;
  }

  FoodItem.prototype.toPantry = function() {
    return "<li class='foodItem' value=" + this.calories + "><strong>" + this.foodname + "</strong><br><em>" + this.calories + "</em><img src= icons/"+this.foodname+".png /></li>";
  }

  function Pantry() {
    thisPantry = this;
    this.foods = [   
      {"foodname" : "Apple",     "calories" : 30,  "group" : "dessert"},
      {"foodname" : "Bagel",     "calories" : 150, "group" : "starch"},
      {"foodname" : "Banana",    "calories" : 40,  "group" : "dessert"},
      {"foodname" : "Bread",     "calories" : 80,  "group" : "starch"},
      {"foodname" : "Broccoli",  "calories" : 50,  "group" : "vegetable"},
      {"foodname" : "Burger",    "calories" : 375, "group" : "protien"},
      {"foodname" : "Cake"  ,    "calories" : 350, "group" : "dessert"},
      {"foodname" : "Carrot",    "calories" : 25,  "group" : "vegetable"},
      {"foodname" : "Cheese",    "calories" : 150, "group" : "starch"},
      {"foodname" : "Chicken",   "calories" : 200, "group" : "protien"},
      {"foodname" : "Chocolate", "calories" : 260, "group" : "dessert"},
      {"foodname" : "Corn",      "calories" : 60,  "group" : "vegetable"},
      {"foodname" : "Eggplant",  "calories" : 45,  "group" : "vegetable"},
      {"foodname" : "Eggs",      "calories" : 150, "group" : "protien"},
      {"foodname" : "Fish",      "calories" : 200, "group" : "protien"},
      {"foodname" : "Fries",     "calories" : 275, "group" : "starch"},
      {"foodname" : "Hotdog",    "calories" : 250, "group" : "protien"},
      {"foodname" : "Icecream",  "calories" : 350, "group" : "dessert"},
      {"foodname" : "Kale",      "calories" : 50,  "group" : "vegetable"},
      {"foodname" : "Mushroom",  "calories" : 60,  "group" : "vegetable"}, 
      {"foodname" : "Pear",      "calories" : 60,  "group" : "dessert"},
      {"foodname" : "Pepper",    "calories" : 50,  "group" : "vegetable"},
      {"foodname" : "Pizza",     "calories" : 350, "group" : "protien"},
      {"foodname" : "Pumpkin",   "calories" : 80,  "group" : "vegetable"},
      {"foodname" : "Ramen",     "calories" : 150, "group" : "starch"},
      {"foodname" : "Rice",      "calories" : 100, "group" : "starch", },
      {"foodname" : "Sausage",   "calories" : 220, "group" : "protien"},
      {"foodname" : "Steak",     "calories" : 250, "group" : "protien"},
      {"foodname" : "Strawberry","calories" : 80,  "group" : "dessert"},
      {"foodname" : "Taco",      "calories" : 160, "group" : "protien"},
      {"foodname" : "Tomato",    "calories" : 70,  "group" : "vegetable"},
      {"foodname" : "Turkey",    "calories" : 160, "group" : "protien"},
      {"foodname" : "Turnip",    "calories" : 40,  "group" : "vegetable"},       
      {"foodname" : "Watermelon","calories" : 40,  "group" : "dessert"},
      {"foodname" : "Wheat",     "calories" : 90,  "group" : "starch"}
    ];

    $.each(thisPantry.foods, function() {
      var food = new FoodItem(this.foodname,this.calories,this.group);
      $("#unsortedPantry").append(food.toPantry());
    });
  }

  var shuffle = function(foodItems) {
        var $temp, rand;
        rand = Math.floor(Math.random() * foodItems--);
        $temp = $(".foodItem:eq(" + foodItems + ")");
        $rand = $(".foodItem:eq(" + rand + ")");
        $temp.before($rand);
        $(".foodItem:eq(" + rand + ")").before($temp);
        if (foodItems) {
          setTimeout(shuffle, 200, foodItems);
        }
      };
  
  function splitUL($ul) {
    var middle = Math.floor($ul.children().length / 2);
    $("<ul></ul>").insertAfter($ul);
    $ul.children().eq(middle-1).nextAll().appendTo($ul.next());
    return $ul.next();
  }

  function mergeSort($ul) {
    if ($ul.children().length < 2) {
      return $ul;
    }
    var $newUL = splitUL($ul);
    return merge(mergeSort($ul), mergeSort($newUL));
  }

  function merge($ul, $newUL) {
    var $result = $("<ul></ul>");
    while ($ul.children().length && $newUL.children().length) {
      if ($ul.children().first().val() < $newUL.children().first().val()) {
        $result.append($ul.children().first());
      } 
      else {
        $result.append($newUL.children().first());
      }
    }
    $result.append($ul.children());
    $result.append($newUL.children()); 
    $result.insertBefore($ul);
    $result.clone().appendTo($(".work"));
    $(".work").append($("<p><strong>Next step:</strong></p>"));
    $ul.remove();
    $newUL.remove();
    return $result;
  }

// Do I still need to .merge the uls into results?

  pantry = new Pantry();
  $("#shuffle").on("click", function() { shuffle($("#unsortedPantry .foodItem").length) });
  $("#sort").on("click", function() {mergeSort($("#unsortedPantry"), 0) });

});


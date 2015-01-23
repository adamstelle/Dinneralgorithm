$(function() {
  function FoodItem(foodname, calories, group) {
    this.foodname = foodname;
    this.calories = calories;
    this.group    = group;
  }

  FoodItem.prototype.toPantry = function() {
    return "<li class='foodItem' value=" + this.calories + ">" + this.foodname + "<br>" + this.calories + "<img src= icons/"+this.foodname+".png /></li>";
  }

  function Pantry() {
    thisPantry = this;
    this.foods = [   
      {"foodname" : "apple",     "calories" : 30,  "group" : "dessert"},
      {"foodname" : "bagel",     "calories" : 150, "group" : "starch"},
      {"foodname" : "banana",    "calories" : 40,  "group" : "dessert"},
      {"foodname" : "bread",     "calories" : 80,  "group" : "starch"},
      {"foodname" : "broccoli",  "calories" : 50,  "group" : "vegetable"},
      {"foodname" : "burger",    "calories" : 375, "group" : "protien"},
      {"foodname" : "cake"  ,    "calories" : 350, "group" : "dessert"},
      {"foodname" : "carrot",    "calories" : 25,  "group" : "vegetable"},
      {"foodname" : "cheese",    "calories" : 150, "group" : "starch"},
      {"foodname" : "chicken",   "calories" : 200, "group" : "protien"},
      {"foodname" : "chocolate", "calories" : 260, "group" : "dessert"},
      {"foodname" : "corn",      "calories" : 60,  "group" : "vegetable"},
      {"foodname" : "eggplant",  "calories" : 45,  "group" : "vegetable"},
      {"foodname" : "eggs",      "calories" : 150, "group" : "protien"},
      {"foodname" : "fish",      "calories" : 200, "group" : "protien"},
      {"foodname" : "fries",     "calories" : 275, "group" : "starch"},
      {"foodname" : "hotdog",    "calories" : 250, "group" : "protien"},
      {"foodname" : "icecream",  "calories" : 350, "group" : "dessert"},
      {"foodname" : "kale",      "calories" : 50,  "group" : "vegetable"},
      {"foodname" : "mushroom",  "calories" : 60,  "group" : "vegetable"}, 
      {"foodname" : "pear",      "calories" : 60,  "group" : "dessert"},
      {"foodname" : "pepper",    "calories" : 50,  "group" : "vegetable"},
      {"foodname" : "pizza",     "calories" : 350, "group" : "protien"},
      {"foodname" : "pumpkin",   "calories" : 80,  "group" : "vegetable"},
      {"foodname" : "ramen",     "calories" : 150, "group" : "starch"},
      {"foodname" : "rice",      "calories" : 100, "group" : "starch", },
      {"foodname" : "sausage",   "calories" : 220, "group" : "protien"},
      {"foodname" : "steak",     "calories" : 250, "group" : "protien"},
      {"foodname" : "strawberry","calories" : 80,  "group" : "dessert"},
      {"foodname" : "taco",      "calories" : 160, "group" : "protien"},
      {"foodname" : "tomato",    "calories" : 70,  "group" : "vegetable"},
      {"foodname" : "turkey",    "calories" : 160, "group" : "protien"},
      {"foodname" : "turnip",    "calories" : 40,  "group" : "vegetable"},       
      {"foodname" : "watermelon","calories" : 40,  "group" : "dessert"},
      {"foodname" : "wheat",     "calories" : 90,  "group" : "starch"}
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

  function sortingFunction(foodItems) {
    var something = mergeSort(foodItems);
    $("#sortedPantry").append(something);
  }

  function merge($left, $right) {
    var result  = [],
            il  = 0,
            ir  = 0;
    while (il < $left.length && ir <$right.length) {
      if ($left[il].value < $right[ir].value){
        result.push($left[il++]);
      } else {
        result.push($right[ir++]);
      }
    }
    return result.concat($left.slice(il)).concat($right.slice(ir));
  }

   function mergeSort(foodItems) {
    if (foodItems.length < 2) {
      return foodItems;
    }
    $temp = $(".foodItem:eq(" + foodItems + ")");
    var middle = Math.floor(foodItems.length / 2),
        $left   = foodItems.slice(0, middle),
        $right  = foodItems.slice(middle, foodItems.length);
    return merge(mergeSort($left), mergeSort($right));
  }

  pantry = new Pantry();
  $("#shuffle").on("click", function() { shuffle($("#unsortedPantry .foodItem").length) });
  $("#sort").on("click", function() {sortingFunction($("#unsortedPantry .foodItem")) });

});


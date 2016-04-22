/*Automobile Object*/
function Automobile(year, make, model, type) {
  this.year = year; //integer (ex. 2001, 1995)
  this.make = make; //string (ex. Honda, Ford)
  this.model = model; //string (ex. Accord, Focus)
  this.type = type; //string (ex. Pickup, SUV)
}

/*Method: logMe for Automobile Object*/
/*Description: Prints the properties in an automobile object.*/
/*Pass a boolean of true to print type*/
Automobile.prototype.logMe = function(bool) {
  if (bool == true) {
    console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
  } else {
    console.log(this.year + " " + this.make + " " + this.model + " ");
  }
}

var automobiles = [
  new Automobile(1995, "Honda", "Accord", "Sedan"),
  new Automobile(1990, "Ford", "F-150", "Pickup"),
  new Automobile(2000, "GMC", "Tahoe", "SUV"),
  new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
  new Automobile(2005, "Lotus", "Elise", "Roadster"),
  new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array) {
  var newArr = array.slice();
  for (var i = 0; i < newArr.length - 1; i++) {
    for (var j = i + 1; j < newArr.length; j++) {
      if (comparator(newArr[j], newArr[i])) {
        var temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
      }
    }
  }
  return newArr;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator(int1, int2) {
  if (int1 > int2) {
    return true;
  } else {
    return false;
  }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator(auto1, auto2) {
  if (auto1.year > auto2.year) {
    return true;
  } else {
    return false;
  }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator(auto1, auto2) {
  if (auto1.make.toLowerCase() < auto2.make.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator(auto1, auto2) {

  /*Function: orderType*/
  /*Parameters: automobile object*/
  /*Description: Returns a number based on the type of the automobile*/
  var orderType = function(auto) {
    switch (auto.type.toLowerCase()) {
      case "roadster":
        return 1;
        break;
      case "pickup":
        return 2;
        break;
      case "suv":
        return 3;
        break;
      case "wagon":
        return 4;
        break;
      default:
        return 5;
    }
  }

  if (orderType(auto1) < orderType(auto2)) {
    return true;
  } else if (orderType(auto1) == orderType(auto2)) {
    return yearComparator(auto1, auto2);
  } else {
    return false;
  }
}


//Making sorted arrays.
var yearAuto = sortArr(yearComparator, automobiles);
var makeAuto = sortArr(makeComparator, automobiles);
var typeAuto = sortArr(typeComparator, automobiles);

/*Function: printList*/
/*Parameters: array of automobile objects, boolean value*/
/*Description: Calls the logMe function for every automobile object in an array*/
function printList(autoArr, bool) {
  autoArr.forEach(function(x) {
    x.logMe(bool)
  });
}

console.log("*****\nThe cars sorted by year are:");
printList(yearAuto, false);

console.log("\nThe cars sorted by make are:");
printList(makeAuto, false);

console.log("\nThe cars sorted by type are:");
printList(typeAuto, true);
console.log("*****");

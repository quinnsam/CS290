



function deepEqual(x,y){
  //x and y are objects and not null
  if ((typeof x == "object" && x != null) && (typeof y =="object" && y !=null)){
    //First Test - check lengths of x and y are equal
    if (Object.keys(x).length != Object.keys(y).length)
      return false;

    //Second Test - check each individual property in x and y are equal
    for (var prop in x){
      //Check that y has the same property as x, otherwise return false.
      if (y.hasOwnProperty(prop)){
        //Run recursive call on deepEqual on properties of x and y.
        if (!deepEqual(x[prop],y[prop]))
          return false;
      }

      else {
        return false;
      }
    }
    return true;
  }

  //x and y are any other types
  else {
    return x===y;
  }
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(obj, {here: {am: "an"}, object: 2}));

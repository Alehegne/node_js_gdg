function greet(name, callback) {
  console.log("Hello " + name);
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }
  callback(name);
}

function sayGoodbye(name) {
  console.log("Goodbye " + name);
}

//return function
const multipy = (factor) => {
  return (x) => {
    return x * factor;
  };
};

const asyncHandler = (fn) => {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
application.get(
  "/api",
  asyncHandler(async (req, res) => {
    res.send("Hello World");
  })
);

function sum(a, b) {
  return a + b;
}
console.log(sum(2, 3, 4, 5, 6)); // // 2+3 = 5

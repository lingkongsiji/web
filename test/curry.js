const currying = function(fn) {
    let args = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(this, args)
        } else {
            [].push.apply(args, arguments);
            console.log(arguments.callee);
            return currying.call(this, fn)
                // return arguments
        }
    }
};
let cost = (function() {
    let money = 0;
    return function() {
        for (let i = 0, l = arguments.length; i < l; i++) {
            console.log(i);
            console.log(arguments[i]);
            money += arguments[i]
        }
        return money;
    }
})()

let sum = currying(cost)

cost(1, 2)
cost(3)

console.log(sum());






function sum1(a, b, c) {
    return a + b + c;
}

const curry = function(fn) {
    let args = []
    return () => {
        console.log(arguments);
        console.log(arguments.length);
        if (arguments.length === 0) {
            console.log(0);
            return fn.apply(this, args)
        } else {
            console.log(1);
            [].push.apply(args, arguments);
            return arguments.callee
        }
    }
}

let curriedSum = curry(sum1);

console.log(curriedSum());
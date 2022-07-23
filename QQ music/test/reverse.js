let l1 = [1, 2, 3, 4, 5, 6, 7], l2 = [1, 2, 3, 4, 5, 6, 7];
function add(l1, l2) {
    let l3 = [], i, a = 0, b = 0;
    for (i = 0; i < l1.length; i++) {
        a += l1[i] * 10 ** (l1.length - i - 1);
    }
    for (i = 0; i < l2.length; i++) {
        b += l2[i] * 10 ** (l2.length - i - 1);
    }
    let sum = a + b;
    while (sum > 0) {
        l3.push(sum % 10);
        sum = Math.floor(sum / 10);
    }
    return l3.reverse();
}
console.log(add(l1, l2));
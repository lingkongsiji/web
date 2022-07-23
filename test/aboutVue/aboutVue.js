const targetMap = new WeakMap(); //初始化 targetMap，保存观察对象
let activeEffect = []//保存当前正在执行的副作用

const track = (target, key) => { //收集依赖
    if (activeEffect[activeEffect.length - 1]) { // 判断 activeEffect 内是否有依赖
        // 从targetMap中找到对象的Map
        let depsMap = targetMap.get(target)
        if (!depsMap)
            //如果没有，则创建一个新的Map
            targetMap.set(target, depsMap = new Map())

        // 从对象中找到key的Set
        let dep = depsMap.get(key)
        if (!dep)
            //如果没有指定key，则创建一个新的Set
            depsMap.set(key, dep = new Set())

        dep.add(activeEffect[activeEffect.length - 1]) // 增加副作用
    }
};

const trigger = (target, key) => { //执行指定对象的指定属性的所有副作用
    // 从targetMap中找到对象的Map
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    // 从对象中找到key的Set
    const dep = depsMap.get(key);
    if (dep)
        dep.forEach(effect => effect()); // 执行副作用
};

let product = { price: 10, quantity: 2 }, total = 0;

const effect = (eff) => {
    activeEffect.push(eff)
    eff()
    activeEffect.pop()
}

track(product, "price");
track(product, "quantity");

product.price = 20;
trigger(product, "price");//触发product.price副作用,total变为40
console.log(`total: ${total}`);
product.quantity = 3;
trigger(product, "price");
/*
修改了product.quantity，没有触发product.price副作用，
但是total与product.price相关联，所以total也变了。
*/
console.log(`total: ${total}`);//60

const reactive = (target) => {
    //target是待处理的对象
    //handler是处理函数
    const handler = {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            // console.log(`get ${key} value: ${result}`);
            track(target, key);
            return result;
        },
        set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            // console.log(`set ${key} value: ${value}`);
            trigger(target, key);
            return result;
        }
    }
    return new Proxy(target, handler);
}

product = reactive(product);
product.quantity = 3;//触发quantity副作用,total变为60
console.log(`total: ${total}`);

const ref = raw => {
    // raw是待处理的对象
    const r = {
        // 初始化值
        get value() {
            track(r, 'value');
            return raw;
        },
        // 设置值
        set value(newVal) {
            raw = newVal;
            trigger(r, 'value');
        }
    }
    return r;
}

// const ref = (value) => {
//     let target = { value }
//     const handler = {
//         get(target, key, receiver) {
//             const result = Reflect.get(...arguments);
//             track(target, key);
//             return result;
//         },
//         set(target, key, value, receiver) {
//             const result = Reflect.set(...arguments);
//             trigger(target, key);
//             return result;
//         }
//     }
//     return new Proxy(target, handler);
// }

const count = ref(0);
console.log(count.value); // 0
count.value++;
console.log(count.value); // 1


const computed = getter => {
    let result = ref();
    effect(() => result.value = getter());
    // result.value = getter();
    // console.log(result.value);
    return result;
}

let salePrice = computed(() => {
    return product.price * 0.9;
})
let total_ = computed(() => {
    return salePrice.value * product.quantity;
})

console.log(total_.value, salePrice.value);
product.quantity = 5;
console.log(total_.value, salePrice.value);
product.price = 30;
console.log(total_.value, salePrice.value);

const watch = (getter, cb) => {//监听器
    // getter是待监听的属性,cb是回调函数
    effect(() => {
        const newValue = getter();
        cb(newValue);
    }
    )
}

let count_ = ref(0);
watch(() => count_.value, (newValue) => {
    console.log(`count: ${newValue}`);
}
)
count_.value++;

let salePrice_ = ref({ price: 10, quantity: 2 });
watch(() => salePrice_.value.price, (newValue) => {
    console.log(`salePrice price: ${newValue}`);
})
salePrice_.value.price = 20;
salePrice_.value.quantity = 3;
console.log(salePrice_.value);
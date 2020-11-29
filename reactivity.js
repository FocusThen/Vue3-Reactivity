// let product = reactive({ price: 10, quantity: 4 })
// let total = product.price * product.quantity
// console.log(total)
// product.quantity = 5
// console.log(total)

// console.log(total)
// product.quantity = 5
// effect()
// console.log(total)

// track()
// console.log(total)
// product.quantity = 5
// trigger()
// console.log(total)

let dep = new Set()
function track(target, key) {
  if (activeEffect) {
    //   console.log('track')
    // get the depsMap from targetMap
    // get the dep from depsMap (of targetMap)
    dep.add(activeEffect)
  }
}

function trigger(target, key) {
  //   console.log('trigger')
  dep.forEach((effect) => effect())
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      // console.log('get', key)
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      // console.log('set', key, value)
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    },
  }

  return new Proxy(target, handler)
}

// let productProxy = new Proxy(product)
// console.log(productProxy.quantity)

function effect(fn) {
  activeEffect = fn
  if (activeEffect) activeEffect()
  activeEffect = null
}

// const effect = () => {
//   total = product.price * product.quantity
// }
// effect()

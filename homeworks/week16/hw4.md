## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // ?? undefined
```

先將第一個呼叫 function 的程式碼都改成 `.call` 的方式：
```js
obj.inner.hello.call(obj.inner)
```

`.call` 的第一個參數就是呼叫時的 this，所以 `obj.inner.hello.call(obj.inner)` 執行的會是 `console.log(obj.inner.value)`，obj.inner.value 的值是 2，所以會前兩個呼叫 function 的程式碼都會印出 2。
```js
// 2
```
 
接著看第二個，obj2 被賦值為 obj.inner，所以其實和第一個呼叫是一樣的，可以改寫成：
```js
obj.inner.hello.call(obj.inner) // obj2 => obj.inner
```
 
印出來也是 2：
```js
// 2
// 2
```

`hello()` 是被全域物件呼叫，在非嚴格模式下，在瀏覽器這個 this 會是 window；在 node.js 中會是 global，不論 window 和 global 都沒有 value 這個屬性，所以印出來的是 undefined。
```js
// 2
// 2
// undefined
```
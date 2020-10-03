## hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

### 編譯階段
 
程式碼編譯階段會先建立全域執行環境（Global Execution Context，以下簡稱 Global EC），並建立變數物件（Variable Object，以下簡稱 VO），宣告函式也會建立執行環境（Execution Context，以下簡稱 EC），並建立執行物件（Activation Object，以下簡稱 AO）。

VO 和 AO 內初始化程式碼的原則如下：
1. 函式宣告：
    - 把 function 宣告放進 VO
    - 如果 VO 已經有個同名的 property，則取代之

2. 變數宣告
    - 把變數宣告放進 VO，並初始化成 undefined
    - 如果 VO 已經有重複的同名 property，該 property 所指向的值和屬性都不會改變
    - 如果變數宣告和 function 宣告或函式同名，則不改變先前的 property
3. 參數：
    - 把參數放進 VO
    - 沒有傳的參數會被初始化成 undefined

所以可建立出編譯階段的 EC 模型如下：

```js
fn2EC AO {
    
}

fnEC AO {
  a: undefined,
  fn2: function fn2
}

GlobalEC AO{
  a: undefined,
  fn: function,
}
```

### 執行階段
 
1. 執行第一行，宣告變數 a 賦值為 1。
```js
fn2EC AO {

}

fnEC AO {
  a: undefined,
  fn2: function fn2
}

GlobalEC VO {
  a: 1,
  fn: function,
}

```
2. 呼叫 fn()，執行 console.log(a)，在 fnEC.AO 找到 a 是 undefined，印出 undefined。
```jsx
// undefined
```
 
3. 重新宣告 a 並賦值為 5。
```js
fn2EC AO {
    
}

fnEC AO {
  a: 5,
  fn2: function fn2
}

GlobalEC VO {
  a: 1,
  fn: function,
}
```
 
4. 在 fnEC.AO 找到 a 是 5，印出 5。
```js
// undefined
// 5
```
 
5. 執行 a++，把 a 重新賦值為 6。
```js
fn2EC AO {
    
}

fnEC AO {
  a: 6,
  fn2: function fn2
}

GlobalEC VO {
  a: 1,
  fn: function,
}
```
 
6. 再次宣告變數 a，已經宣告過 a 了，此宣告並未賦值，等於沒有作用。
 
7. 呼叫 fn2， 執行 fn2 內的 `console.log(a)` ，在 fn2EC.AO 內找不到 a，向上一層尋找，找到 fnEC.AO 的 a 是 6，所以印出 6。
```js
// undefined
// 5
// 6
```
 
8. 執行 a = 20，由於 fn2EC.AO 裡面並沒有 a，所以往上一層找，找到 fnEC.AO 裡面有宣告過 a，於是把這個 a 重新賦值為 20。
```js
fn2EC AO {
    
}

fnEC AO {
  a: 20,
  fn2: function fn2
}

GlobalEC VO {
  a: 1,
  fn: function,
}
```
 
9. 執行 b = 20，但 fn2EC.AO 內沒有宣告過 b，往上找 fnEC.AO 也沒有，再往上找 GlobalEC.VO 裡還是沒有，於是在全域宣告一個 變數 b 並賦值為 100。至此 fn2 已經執行完了。
```js
fn2EC AO {
    
}

fnEC AO {
  a: 20,
  fn2: function fn2
}

GlobalEC VO {
  a: 1,
  b: 100,
  fn: function,
}
```
 
10. 執行 `console.log(a)`，此時 fnEC.AO 的變數 a 是 20，所以印出 20，至此 fn 執行完畢。
```js
// undefined
// 5
// 6
// 20
```
 
11. 執行 `console.log(a)`，GlobalEC VO 的變數 a 是 1，所以印出 1。
```js
// undefined
// 5
// 6
// 20
// 1
```
 
12. 將全域變數的 a 重新賦值為 10。
```js
fn2EC AO {
    
}

fnEC AO {
  a: 20,
  fn2: function fn2
}

GlobalEC VO {
  a: 10,
  b: 100,
  fn: function,
}
```

13. 執行 `console.log(a)`，GlobalEC VO 的變數 a 是 10，所以印出 10。
```js
// undefined
// 5
// 6
// 20
// 1
// 10
```

13. 執行最後一行 `console.log(b)`，GlobalEC VO 的變數 b 是 100，所以印出 100。


以下就是所有印出的內容：
```js
// undefined
// 5
// 6
// 20
// 1
// 10
// 100
```

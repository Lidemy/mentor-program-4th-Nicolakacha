## hw1：Event Loop

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)

/*
印出
1
3
5
2
4
*/
```

1. 將 `console.log(1)` 放進 Call Stack 執行，印出 1。
2. 將 `setTimeout(() => {
  console.log(2)
}, 0)` 放進 Call Stack 執行，呼叫 setTimeout 這個 Web API，本行執行完畢，setTimeout 倒數時間設定為 0，倒數完畢後，將 `console.log(1)` 放入 Callback Queue 待命。
3. 將 `console.log(3)` 放進 call stack 執行，印出 3。
4. 將 `console.log(5))` 放進 Call Stack 執行，印出 5。
5. 將 `setTimeout(() => {
  console.log(4)
6. Call Stack 上的任務都已執行完，一旦 Call Stack 清空時，Event Loop 機制會將 `console.log(2)` 放入 Call Stack 執行，印出 2。
7. Event Loop 機制將 `console.log(4))` 放入 Call Stack 執行，印出 4。

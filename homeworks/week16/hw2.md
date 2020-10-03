## hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

/*
印出
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
*/

```

1. 建立 for 迴圈，宣告變數 i = 0，判斷 i 是否 < 5，是，於是進入迴圈。
2. 進入迴圈，將 `console.log('i: ' + i)` 放入 Call Stack 執行，印出 i: 0。
3. 將 `setTimeout(() => {
  console.log(i)
}, 0)` 放進 Call Stack 執行，呼叫 setTimeout 這個 Web API，本行執行完畢，setTimeout 倒數時間設定為 0 並開始倒數，倒數完畢後，會將 `console.log(i)` 放入 Callback Queue 待命。
4. i 被重新賦值為 1，判斷 i 是否 < 5，是，於是進入迴圈。
5. 進入迴圈，將 `console.log('i: ' + 1)` 放入 Call Stack 執行，印出 i: 1。
6. 將 `setTimeout(() => {
  console.log(i)
}, 1000)` 放進 Call Stack 執行，呼叫 setTimeout 這個 Web API，本行執行完畢，setTimeout 倒數時間設定為 1 秒並開始倒數。
7. i 被重新賦值為 2，判斷 i 是否 < 5，是，於是進入迴圈。
8. 進入迴圈，將 `console.log('i: ' + 2)` 放入 Call Stack 執行，印出 i: 2。
9. 將 `setTimeout(() => {
  console.log(i)
}, 2000)` 放進 Call Stack 執行，呼叫 setTimeout 這個 Web API，本行執行完畢，setTimeout 倒數時間設定為 2 秒並開始倒數。
10. i 被重新賦值為 3，判斷 i 是否 < 5，是，於是進入迴圈。
11. 進入迴圈，將 `console.log('i: ' + 3)` 放入 Call Stack 執行，印出 i: 3。
12. 將 `setTimeout(() => {
  console.log(i)
}, 3000)` 放進 Call Stack 執行，呼叫 setTimeout 這個 Web API，本行執行完畢，setTimeout 倒數時間設定為 3 秒並開始倒數。
13. i 被重新賦值為 4，判斷 i 是否 < 5，是，於是進入迴圈。
14. 進入迴圈，將 `console.log('i: ' + 4)` 放入 Call Stack 執行，印出 i: 4。
15. 將 `setTimeout(() => {
  console.log(i)
}, 4000)` 放進 Call Stack 執行，呼叫 setTimeout 這個 Web API，本行執行完畢，setTimeout 倒數時間設定為 4 秒並開始倒數。Callback Queue 待命。
16. i 被重新賦值為 5，判斷 i 是否 < 5，否，於是跳出迴圈，迴圈執行完畢。Call Stack 已清空。
17. 先前倒數 0 秒的 `console.log(i)` 已數完，並被放入 Callback Queue，由於 Call Stack 已清空，Event Loop 機制啟動，Callback Queue 內的任務 `console.log(i)` 被丟進 Call Stack 執行，此時 i 已經是 5，於是印出 5，執行完後，Call Stack 再次被清空。
18. 經過 1 秒，先前倒數 1 秒的 `console.log(i)` 已數完，並被放入 Callback Queue，由於 Call Stack 已清空，Event Loop 機制啟動，Callback Queue 內的任務 `console.log(5)` 被丟進 Call Stack 執行，此時 i 已經是 5，於是印出 5，執行完後，Call Stack 再次被清空。
19. 經過 1 秒，先前倒數 2 秒的 `console.log(i)` 已數完，並被放入 Callback Queue，由於 Call Stack 已清空，Event Loop 機制啟動，Callback Queue 內的任務 `console.log(5)` 被丟進 Call Stack 執行，此時 i 已經是 5，於是印出 5，執行完後，Call Stack 再次被清空。
20. 經過 1 秒，先前倒數 3 秒的 `console.log(i)` 已數完，並被放入 Callback Queue，由於 Call Stack 已清空，Event Loop 機制啟動，Callback Queue 內的任務 `console.log(5)` 被丟進 Call Stack 執行，此時 i 已經是 5，於是印出 5，執行完後，Call Stack 再次被清空。
21. 經過 1 秒，先前倒數 4 秒的 `console.log(i)` 已數完，並被放入 Callback Queue，由於 Call Stack 已清空，Event Loop 機制啟動，Callback Queue 內的任務 `console.log(5)` 被丟進 Call Stack 執行，此時 i 已經是 5，於是印出 5，執行完後，Call Stack 再次被清空。，程式碼至此執行完畢。

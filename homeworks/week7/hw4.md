## 什麼是 DOM？
DOM 是將 HTML 文件以一種樹狀結構表示的模型，我們可以使用 JavaScript，透過不同的 DOM API 方法來存取和操作 HTML 文件上不同的節點及內容。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件傳遞可以分為三個階段，事件捕獲 -> 目標 -> 事件冒泡。

事件傳遞會從 DOM tree 的最外層開始向內層傳遞，直到觸發事件的元素（e.target），再往上層冒泡至 DOM tree 的最外層。當事件傳遞到觸發事件的元素（e.target）時，是沒有分冒泡或捕獲階段的，無論 `addEventListener` 的第三個參數是 true 還是 false，`e.eventPhase` 都是 AT_TARGET。

- 捕獲：事件傳遞機制中，由 DOM tree 最外層向內逐層傳遞，觸發各節點的事件監聽。
- 冒泡：事件傳遞機制中由觸發事件的元素，向外逐層傳遞觸發各元素的事件監聽，直到 DOM tree 的最外層。

## 什麼是 event delegation，為什麼我們需要它？
利用事件傳遞機制的原理，去監聽外層的元素，判斷 `e.target` 是我們要的目標節點時，再去做後續的操作，在很多情況下就可以不用去重複監聽無數個目標物。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
- `event.preventDefault()`：是阻擋事件的預設行為，和事件傳遞沒有關係，並不影響事件傳遞。像點擊 `<a>` 連結會觸發連結到某個網址，使用 `event.preventDefault()` 可以阻擋這個動作。

  ```
  <label>
    <a href="https://google.com.tw">Google</a>
  </label>
  ```

- `event.stopPropagation()`：阻擋事件冒泡傳遞，如果我們想要阻擋事件向上冒泡傳遞時就可以使用。舉例來說，以一個 `<label>` 包覆一個連結 `<a>`，當我們監聽 `<a>` 的 click 事件時，可以知道會冒泡到 `<label>` 上，如果我們把事件監聽下在 `<a>` 時加上 `event.stopPropagation()`，就不會往上冒泡到 `<label>`。


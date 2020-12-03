## Redux middleware 是什麼？

Redux 的資料流中，使用 middleware 可以 dispatch action 抵達 reducer 之前，建立中間點來做一些額外的行為，例如印出 log、回報錯誤、執行非同步行為等。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

- CSR（Client-side-rendering）是指 Client 端瀏覽器一開始收到的 HTML 是空的，內容和畫面在之後由 JavaScript 動態產生。
- SSR（Server-side-rendering）是指內容和畫面在 Server 端就準備好才傳給 Client 端的瀏覽器。

由於搜尋引擎會檢查網頁的原始碼，並以演算法為搜尋結果排序，而 CSR 的網頁原始碼會是空的，這類網站在搜尋結果頁面的排序就會比較差。

## React 提供了哪些原生的方法讓你實作 SSR？

可以使用 ReactDOMServer 這個 API：
- `renderToString()`：這個 method 會接收 React 元素並回傳成 HTML 字串，因為只是 HTML 字串，在 client 端要要呼叫 `ReactDOM.hydrate()` 來把這些 HTML 注水，加上事件處理的功能。
- `renderToStaticMarkup()`：這個 method 會接收 React 元素並回傳 HTML 字串，和 `renderToString()` 的區別是不會建立額外的 DOM 屬性，例如 `data-reactroot` 等，如果只是要建立不需要互動的靜態網頁可以使用。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

1. [Prerender](https://prerender.io/)：Prerender 會把網站 JavaScript 渲染出來的結果存成靜態的 HTML，當搜尋引擎的爬蟲試圖爬我們的網站時，就把之前存的靜態 HTML 回傳給它。
2. [Next.js](https://nextjs.org/)：基於 React 的框架，功能完整且可以支援 SSR。



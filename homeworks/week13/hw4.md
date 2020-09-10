## Webpack 是做什麼用的？可以不用它嗎？
webpack 是一套模組打包工具，在 ES6 規範的標準化模組出現前，JavaScript 並沒有一個官方的模組規範，node.js 使用的 CommonJS 模組規範在瀏覽器上也不支援，所以我們透過 webpack 把寫好的 JavaScript 模組打包成一包，讓 JavaScript 可以在瀏覽器上運行。

雖然後來出現了 ES6 規範的標準化模組（ import 和 export），在部分瀏覽器上已可支援，但我們在做網站時還需要考量到舊的瀏覽器的支援度，有許多舊瀏覽器（例如即將走入歷史的 IE）是不支援這個新的 ES6 模組的。

此外，就算不考慮瀏覽器支援度，在瀏覽器上使用 ES6 模組還有不易維護的問題，在 node.js 上，我們可以直接把 node_modules 裡下載好的第三方套件 require 進來，但瀏覽器上，如果不使用 webpack 打包，雖然我們也可以把整個 node_modules 資料夾上傳上去，但 import 的路徑就要是完整的路徑，這樣一來就不容易維護，一旦入口點有變更，所有的 import 也要一起改寫。

此外，webpack 好用的地方在於，它把模組的概念從 JavaScript 向外延伸，不論是 CSS、SASS、圖片都可以被視為一個資源模組，可以透過不同的 loader 把各種資源載入到 Webpack 打包成一個 JavaScript 檔案。

## gulp 跟 webpack 有什麼不一樣？
兩者定位不同，Gulp 是一套 task manager，重點是任務和流程管理，它的 task 可以有很多種，而不只侷限於 babel, sass, uglify js 這些，但它做不到像 Webpack 那樣把所有的資源打包在一起。

而 webpack 的定位主要是打包工具，目的是為了要讓瀏覽器能夠支援 module，只是我們在透過各種 loader 把資源載入給 webpack 打包成一包時，也可以進行 babel, sass 轉 css 之類的功能，所以才會覺得 gulp 和 webpack 很混淆。

簡單來說就是，gulp 可以做各種 tasks 但做不到打包，webpack 能做把各種資源打包，但做不到很多 gulp 才能做到的 tasks。

## CSS Selector 權重的計算方式為何？
若單純以 Selector 而言，權重的計算是：

- ID 的數量為 a
- class selectors, attributes selectors, and pseudo-classes 的數量為 b
- type selectors, pseudo-elements 的數量為 c
- \* 萬用選取器的權重忽略

將三個數字 a-b-c 合起來之後就是該 selector 的權重，例如：

| selector           | count         | specificity |  
| :----------------- | :------------ | :---------: | 
| .container li      | a=0, b=1, c=1 | 11          | 
| li.container.red   | a=0, b=2, c=1 | 21          | 
| #footer            | a=1, b=0, c=0 | 100         | 
| *                  | a=0, b=0, c=0 | 0           | 

\
更詳細的 CSS 權重規則，權重由高至低排列：
- Animation 動畫執行期間的 CSS 屬性
- 具備 !important 的 CSS 屬性
- 直接在 HTML 寫的 inline style
- ID 選取器 # （選取器計算權重中的 a）
- class、屬性選取器、偽類 （選取器計算權重中的 b）
- tag、偽元素 （選取器計算權重中的 c）
- 萬用選取器 *
- 繼承來的屬性



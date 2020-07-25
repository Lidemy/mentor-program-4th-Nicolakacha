## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. `<table>` 中的 `<caption>` 可以用來標記表格的標題，也能幫助無障礙使用者體驗，讓使用螢幕閱讀器或輔具的使用者更好的閱讀表格。
2. `<aside>` 是 HTML5 新的語意化標籤，用來表示此區塊跟主內容沒直接關係，可以用來放額外資訊。
3. `<video>` 用來放影片或做影音串流 `<audio>`用來放聲音或聲音串流。

## 請問什麼是盒模型（box model）
每個HTML元素都可被視為一個 box，box modal 就是定義該 box 的長寬。
1. content-box：預設的 box model，以 content 的長寬為 box 的長寬，也就是說，border 和 padding 都不算 width 和 height。所以如果設定的 border 和 padding，會往外延伸出去。
2. border-box：width 和 height 有包含 border 和 padding。
- 記憶口訣：content-box 就是從 content 開始往內算是 box，border-box 就是從 border 開始往內都算是 box。 


## 請問 display: inline, block 跟 inline-block 的差別是什麼？
1. block：和塊級元素一樣，有自己的寬跟高。
2. inline：內容多寬舊多寬，沒有自己的寬高。
3. inline-block：有自己的寬跟高卻不會占據一整行。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
1.  static：靜止的，沒辦法改變位置，預設的自然文章流動。
2. relative：相對於它原本應該出現的位置，可調整位置，可用來當作容器，作為子層元素的定位參考點。
3. absolute：不管身邊的其他元素，找有設定過 position 的上層元素當作依據。
4. fixed：在可視畫面上做位置的設定，調整位置就是以可視畫面來做計算。
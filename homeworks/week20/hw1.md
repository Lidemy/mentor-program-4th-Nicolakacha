## 十六到二十週心得

雖然這幾週學習並不輕鬆，但回過頭來看覺得收穫很多耶，以結果來說是該心滿意足的 XD，JavaScript 核心理論讓我在寫程式的時候，開始感覺比較自在，減少看不懂程式碼怎麼跑或是程式碼跑得跟我想的不一樣的的情況～

另外之前一直覺得自己對 MVC 架構僅限於字面上的理解，用 Express 練習寫後端 MVC 架構的網站之後，才對 MVC 比較有感覺，也突然對前端後端有了更好的理解，果然抽象概念還是實作和練習過會比較清楚。

接下來幾週的學習安排會跟之前很不一樣，同時跟課和進行 Final Project 需要更好的時間安排，之前每週大概需要 65 小時來學習和複習，接下來四週可能要壓縮到 45 小時 左右，把時間分配給 Final Project，課程進入最後階段也代表課程快結束了，有點捨不得啊嗚嗚。

### 關於 Final Project

Final Project 目前我們這組（Krebikshaw, Ruofan, Small-leaf 和我）已經做好初步的 User Flow、Desktop Wireframe、資料庫設計、API 文件，目前正在做 Mobile Wireframe，以及規劃每個頁面的路由及會串到哪些內部 API，但不知道方向和內容是不是在對的道路上，之後我們有比較完整的規格書完成之後，想請 Huli 和助教提供建議 QQ。

## 自我檢測

### Week16

- P1 你知道 Event Loop 的運作方式

  JavaScript 中，Event Loop 機制會在 Call Stack 為空時，把在 Callback Queue 中待命的任務立即放進 Call Stack 裡面執行。

- P1 你知道什麼是作用域（Scope）

  JavaScript 中的作用域，指的是變數的生存範圍，在 ES5 以前，變數的作用域是 function，ES6 新出現了 let 與 const 兩種宣告變數的方式，其作用域是以 block 為單位，block 是程式碼中任何看得到的 `{}`，或是 for 迴圈和 if 判斷式中的 () 內也算。

- P1 你知道 Hoisting（提升）是什麼

  以下面這段程式碼為例，當我們宣告一個變數時，宣告本身會被提升至程式碼最上面，而賦值則留在原地，所以上面的 `console.log(b)` 會印出 undefined，這就是 Hoisting 現象。
  ```js
  console.log(b);
  var b = 'ILoveLidemy';
  ```

- P1 你知道 Hoisting 的原理為何

  JavaScript 在執行前會有編譯階段，在 Execution Context 的編譯階段時，會把程式碼進行初始化，而變數的宣告會被放進 Variable Object，並初始化成 undefined，所以在上面的例子中，`console.log(b)` 才會印出 undefined。

- P1 你知道 Closure（閉包）是什麼

  我的理解是，當一個 function 記住某個外部變數，就算把這個 function 傳到別的地方，它還能繼續記住這個外部變數，這個現象就是閉包。

- P1 你能夠舉出一個運用 Closure 的例子
  以 week16 練習題的 debounce 範例來說：
    ```js

    $('input').change(handleChange)

    const debouncedFn = debounce(getAutoSuggestions, 250)
    function handleChange(e) {
      const value = e.target.value
      debouncedFn(value)
    }

    function debounce(fn, delay) {
      let timer = null
      return function (...args) {
        if (timer) {
          clearTimeout(timer)
        }
      timer = setTimeout(() => fn(...args), delay)
      }
    }
    ```
  `const debouncedFn = debounce(getAutoSuggestions, 250)` 宣告 debouncedFn 時， debounce 這個 function 就已經執行完了，但它所回傳的 function 被賦值到 debouncedFn 上，而 debouncedFn 之後執行時，仍然要參考到 debounce 裡面的變數 timer，所以 timer 會先被保留，不會隨著 debounce 執行完畢就被消滅，這就是運用閉包的概念。
  
  之後執行 `debouncedFn(value)` 時，也就是執行 `function(value) { if(timer){...略} }`，timer 是參考到原來 debounce function 裡的 timer，此時為 null，所以直接執行下一行，設定 setTimeout 開始倒數，並把 setTimeout 的回傳值（計時器 ID）賦值到 timer 上，倒數 250 毫秒完就執行 getAutoSuggestions。
  
  如果計時器沒數完就重新執行 handleChange，執行裡面的 `if(timer){...略}` 時，因為第一次有設置過 setTimeout，timer 這時的值是上一次的計時器 ID，那麼一旦 timer 有值，就進入 `if(timer){...略}`  執行 clearTimeout 來停止計時器。接著下一行，設定新的計時器 setTimeout 開始倒數，並把新的計時器 ID 賦值到 timer 上，倒數 250 毫秒完就執行 getAutoSuggestions。

- P1 你知道 Prototype 在 JavaScript 裡是什麼

  JavaScript 透過 Prototype 來實現物件導向的 class 類別與 instance 實體，利用原型鏈來實現兩者的繼承 inheritance。

  當一個實體 a 從建構函式 b 中用 new 方法創建出來時，`a.__proto__` 會指向建構函式的原型，也就是 `b.prototype`，而 `b.prototype.constructor` 則就是建構函式 b 本身。

- P1 你知道大部分情況下 this 的值是什麼

  大部分的情況下，找 this 的值可以找是誰在呼叫這個 function，而更詳細可以分成四種綁定：
  1. 預設綁定（Default Binding）：在全域下的變數和宣告的 function，可以看做全域物件的屬性，當物件被呼叫的當下如果沒有指定 this 的值，this 會自動指定為全域物件
  2. 隱含綁定（Implicit Binding）：若該 function 有被某物件指定為屬性並呼叫，this 就是指呼叫 function 的那個物件
  3. 顯式綁定（Explicit Binding）：透過 `.call()`、`.apply()` 或 `.bind()` 方法來手動指定 this 的值
  4. new 的綁定：構造函數中的 this，是指新創建的 instance 物件
  
  其他例外：
  - 對某 DOM 元素進行事件監聽時，handler function 的 this 是觸發這個 function 的 DOM 元素，也就是 e.currentTarget
  - Arrow function 本身沒有 this，如果在 arrow function 內看到 this，它其實和 arrow function 外部的 this 是一樣的

- P2 你知道物件導向的基本概念（類別、實體、繼承、封裝）

  知道基本概念，但覺得缺乏實務上的使用經驗，所以有點心虛 QQ


### Week17

- P1 學習如何使用 Express 及其相關套件

  學的時候覺得好困難，常常迷失在各種資料夾和檔案裡，實際寫過一輪作業之後覺得架構很舒服，尤其是還有很多有趣的第三方 middleware 可以探索。

- P1 我理解為什麼會需要框架

  我的理解是框架能夠幫助開發者使用更方便的方式開發，例如後端框架 Express 就以路由和不同 middleware 的形式，來建立起網站的架構。

- P1 了解什麼是 ORM

  ORM 是一套幫助開發者能使用程式語言的物件概念來操作資料庫的工具，透過 ORM 就可以不需要直接寫 SQL 語法。

- P1 了解 ORM 的優缺點

  Pros
  - 能夠使用物件的方式來存取資料庫，而不需要直接下 SQL queries
  - 自動幫開發者完成許多工作，例如 table 與 column 的建立，不同 table 關聯的建立等

  Cons
  - 覺得初期學習成本的 SQL queries 高
  - 要注意可能發生的 N+1 problem
  - 會有點不想回去寫 SQL queries

- P1 了解什麼是 N+1 problem

  簡單回答一下，N+1 problem 是指因為大多數 ORM 工具在進行有一對多的資料庫查詢時，會用採用簡單遍歷 N 次的方式，但過多的查詢容易拖累網站效能。

- P1 我知道如何部署 Node.js 應用程式到 heroku

  和佈署到 Ubuntu 主機上相比，佈署到 heroku 真是太愜意了 XD

### Week18

- P1 我能夠從頭把一個網站獨立建起來
- P1 我知道如何部署 Node.js 的網站到自己的主機
- P2 我知道如何使用 Nginx
- P2 我知道如何使用 PM2

  四題一起回答，有成功使用 Nginx 和 PM2 在 AWS EC2 主機上佈署 Node.js 的網站，所以應該可以說是能...能夠吧，只是過程有點掙扎 XD，如果佈署時遇到突發問題，會需要一些時間研究（或問人）才能解決，~~也有可能不能解決~~

### Week19

- P1 知道什麼是 Scrum

  Scrum 是一種敏捷軟體開發方法，相較於從規劃到開發完成間的每階段都要全部完成才能往下進行的 Waterfall 開發方法，Scrum 把開發切分為多次疊代的開發週期，每次疊代前都討論出本輪開發週期要優先開發的需求，並以創造出可用的軟體為目標。而在開發期間若遇到需求改變，則可以在下一次的疊代開發週期中反應。透過 Scrum 開發方法，能夠即時獲得利益關係人的反饋，不論需求改變或遇到問題也都能即時調整，達到快速開發產品的目標。

- P1 知道 Scrum 中通常會有哪些元素

  - Scrum Master：確保團隊的 Scrum 方法正常運作
  - Product Owner：定義產品內容並確定方向，對產品負責
  - Development Team：參與執行開發的成員，包含但不限於軟體開發者
  - Product Backlog：根據 user stories 所描述產品的所有功能
  - Sprint： 每一輪疊代的開發週期，稱為一個 sprint，通常為一到三週，從 product backlog 裡挑選優先要完成的需求來開發
  - Sprint Planning：制定下一次 Sprint 的目標，並從 product backlog 裡面挑選那些需求並訂定 sprint backlog。以長度兩週的 sprint 來說，推薦的 sprint planning 時間為 4 小時
  - Stand-up Meeting：在 sprint 開始之後的每日短時間會議，通常會讓成員聚焦於陳述自己昨天完成 了什麼、今天準備完成什麼、在有看到任何困難會阻礙 sprint 目標嗎，通常限制在 15 分鐘
  - Sprint Review：回顧本次 sprint 完成及未完成哪些工作，和利益關係人展示成果，檢視本次開發結果是否符合期待，並與其討論接下來的進行工作，以長度兩週的 sprint 來說，推薦的 sprint review 時間為 2 小時
  - Sprint Retrospective：回顧本次 sprint 與開發流程有關的面向，有哪些是好的可以繼續保持的部份？或是有哪些是可以改善的部份，並擬定改善計畫，以長度兩週的 sprint 來說，推薦的 sprint review 時間為 1.5 小時

  

- P1 知道什麼是 user story

  一段簡單的需求或功能敘述，範本是 As a `<role>`, I want `<feature>`, so that I can `<receive benefit>`.

## 網頁優化心得

### Lazy-hackathon
優化後網站網址：[Lazy Hackathon](https://nicolakacha.github.io/lazy-hackathon/)

做了哪些優化：
- 圖片使用 tinyPNG 壓縮，再把除了 icon 之外的圖片轉 JPG
- 圖片使用 vanilla-lazyload 來做 lazy loading
- HTML 經過 minify 處理
- CSS 經過 minify 處理
- JavaScript 經過 uglify 處理
- JavaScript 改用 defer 載入
- 合併 slice.css 和 slice-theme.css
- 刪除沒用到的 HTML 和 CSS
- 刪除沒用到的外部資源，例如 Vue, Angular

優化結果：
- PageSpeed Insights: Mobile 38 / Desktop 66
- Lighthouse Report Viewer

  ![](https://i.imgur.com/dmzADy0.png)

- WEBPAGE TEST

  ![](https://i.imgur.com/JLG6yoJ.png)

心得：
- 載入時間已經比一開始好很多了，但效能的帳面分數還是很差，而且網站的安全性很差 QQ。

### Just A Bite 餐廳網站

優化後網站網址：[餐廳網站](https://gentle-caverns-02920.herokuapp.com/)

前端做了哪些優化：
- 圖片使用 tinyPNG 壓縮並轉成 JPG
- 圖片使用 vanilla-lazyload 來做 lazy loading 及 fade-in 效果
- CSS 經過 cleanCSS 處理，並網站的 HTTPS 1版本利用 concat 合併成一支 main.css
- JavaScript 經過 uglify 處理
- JavaScript 改用 defer 載入

後端做了那些優化：
- 使用第三方 middleware - compression 來執行 GZIP 壓縮
- 使用第三方 middleware - helmet 提升網站安全性
- 使用第三方 middleware - strict-transport-security 來保證瀏覽器訪問網站的 HTTPS 1版本

優化結果：
- PageSpeed Insights: Mobile 91 / Desktop 97 
- Lighthouse Report Viewer

  ![](https://i.imgur.com/qFF83DU.png)

- WEBPAGE TEST

  ![](https://i.imgur.com/6RMjhRe.png)

心得：
- Heroku 免費版本的 dyno 反應速度比較慢，優化完之後覺得載入時間還是蠻久的，150 kb 左右的 banner 居然需要花 1 秒左右，第三方資源也載入比較慢，但效能的帳面分數意外不錯，而且網站的安全性還不錯。

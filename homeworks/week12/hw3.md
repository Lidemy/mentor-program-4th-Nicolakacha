## 請簡單解釋什麼是 Single Page Application
從名詞上來解釋就是所有的功能動作都是在同一個頁面上完成的，不會切換到其他頁面，所以稱為單頁式應用。SPA 做到前後端分離，後端只負責和資料相關的部份，前端用 ajax 和後端互動拿到資料之後，再透過 JavaScript 來處理資料，決定資料要怎麼渲染到畫面上。
 
## SPA 的優缺點為何
 
### 優點
- 不用換頁，使用者體驗較佳。
- 後端變成了一個單純的 API，可以給不同的前端做調用。
 
### 缺點
- 檢視 SPA 頁面的原始碼，會發現沒有畫面上看到的實際內容，這是因為畫面的渲染是由 JavaScript 動態產生的，這樣會使網站的 SEO 表現很差，解法是可以讓第一次的畫面交給後端來產生(Server Side Rendering)，其他畫面才透過 JavaScript 產生(client side rendering)。
- 前端要先下載大量 JavaScript 檔案，才能計算並渲染畫面，所以首次渲染的時間可能較慢。
- 前端要自己做狀態的管理，沒做好狀態管理的情況，舉例來說，若在 SPA 的部落格中快速點擊兩篇文章，可能會發生點進去 A 文章卻出現 B 文章的情況。
 
## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？
前幾週我們做的部落格或留言版中的新增功能為例，若 handle_add.php 檢查填寫有誤時，就會重新導向回 add.php 並帶上錯誤代碼的 query string，add.php 再依拿到的 query string ，由 PHP 判斷要出現什麼錯誤訊息，而重新載入這個頁面時，整個頁面其他不需要改動的部份也又都需要重新載入一次。
 
若做成 SPA，前端透過 ajax 去跟後端的 API 互動，後端判斷資料是否正確，並把存到資料庫中，並透過 API 把成功或失敗的 response 回傳給前端，而前端拿到的 response 後，再由 JavaScript 來決定要渲染什麼畫面，所渲染的畫面是透過 JavaScript 操控 DOM 元素而動態產生的，即使後端 API 掛點，我們的留言板仍然可以顯示基本的架構內容而不至於完全無法運行。
 
## 參考資料
 
[前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/) by Huli

[跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9) by Huli

[前端三十｜18. [FE] 為什麼網站要做成 SPA？SSR 的優點是什麼？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-18-fe-%E7%82%BA%E4%BB%80%E9%BA%BC%E7%B6%B2%E7%AB%99%E8%A6%81%E5%81%9A%E6%88%90-spa-ssr-%E7%9A%84%E5%84%AA%E9%BB%9E%E6%98%AF%E4%BB%80%E9%BA%BC-c926145078a4) by Schaos



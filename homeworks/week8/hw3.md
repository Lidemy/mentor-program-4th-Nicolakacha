## 什麼是 Ajax？
Ajax 是指利用非同步的技術，向 server 發送 request 時，由 JavaScript 決定要傳送及存取哪些資料，收到 response 時不需要重新載入整個頁面。

## 用 Ajax 與我們用表單送出資料的差別在哪？
用表單送出資料時，server 回傳什麼 response 都會被瀏覽器跳頁直接顯示出來，用 Ajax 時，則是把回傳的 response 交給 JavaScript 處理，我們可以再決定要怎麼利用 response 的資料或是監聽某些事件，在某些事件發生時把資料渲染到網頁畫面上。

## JSONP 是什麼？
利用 `<script>` 不受同源政策的限制，跨域存取 Server 的 JavaScript 資料。

## 要如何存取跨網域的 API？
如果是透過瀏覽器發 API，則需要跨來源資源共用(CORS)，server 的 header 上要加上 Access-Control-Allow-Origin，client 端才可以拿到 response。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週是直接在我們的電腦上存取 API，同源政策是在瀏覽器發生的，所以用 node.js 存取 API 時沒有跨網域的問題。

## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

### VARCHAR
- 資料的大小是可以的，最大為 65535 個字元。
- 可以建立 index，但要注意 index 也有大小限制，所以如果 VARCHAR 太長，就只能用前幾個字元當作 index。

### TEXT
- 資料長度固定為最大 65535 個字元，無法限制。
- TEXT 不能建立 index，所以如果要建立 index 就要使用 VARCHAR。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cookie 是一小片段資料，Client 端透過瀏覽器發送 Request 給 Server，Server 端回傳 Response 時，在 Header 內 Set-Cookie，把資料寫到 Cookie 內。這個 Cookie 會被儲存在 Client 端的瀏覽器內，Client 端下次再次發出 Request 給 Server 時，request 會自動把儲存在瀏覽器內的 Cookie 帶上去。這樣就可以達成識別、紀錄、追蹤 Client 端的狀態。所以也就是說，利用 Cookie 就可以實現不同的 Session，解決 HTTP Request 無狀態的問題。

不同瀏覽器對 Cookie 數量與大小的限制也不同，

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
- 沒有找回密碼的功能，不太方便。
- 沒有限定 nickname, username, password 儲存的資料是不是字串，nickname 可能被存一個 `<script>`。
- 沒有防止機器人大量註冊帳密的機制。
- 沒有要求密碼強度，使用者容易設定太簡單的密碼。
- 儲存在資料庫的密碼是明碼，可能會被操作資料庫的人拿去濫用或被外部偷走。



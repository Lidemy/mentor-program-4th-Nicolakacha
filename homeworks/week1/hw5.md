## 請解釋後端與前端的差異。

- 前端是指介面，而後端是指系統架構和資料庫。
- 前端發出 request 給後端，後端接收後發出 response 給前端。
- 使用者看到的介面是前端，發出 request 後由後端伺服器資料把資料儲存在資料庫，並發出 response 回來給前端，成為我們看到的網頁畫面。
- 前端的範疇主要包含網頁內容的 HTML、編輯樣式的 CSS、在網頁上做各種動作的 Javascript。
- 後端的範疇主要包含後端語言、資料庫管理 。


## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

1. 我叫瀏覽器發送一個 Request
2. 瀏覽器叫作業系統發送一個 Request
3. 作業系統叫網路卡送出 Request 給 DNS Server
4. DNS Server 找到 Google Server
4. Google Server 進入 Database 抓資料
5. Google Server 發送 Response 給我電腦網路卡
6. 網路卡解析完後傳給作業系統
7. 作業系統解析完傳給瀏覽器
8. 瀏覽器解析 html，在瀏覽器上顯示出來成為我看到的搜尋畫面 

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

1. `tail` 顯示該檔案最後幾行內容
    `tail 檔案名稱`

2. `node` 在終端機上編輯文字檔
    `node 檔案名稱`

3. `file` 檢查檔案類型
    `file 檔案名稱`
    範例：
     `file hw1.md`
    `hw1.md: UTF-8 Unicode text, with CRLF line terminators`


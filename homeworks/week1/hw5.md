## 請解釋後端與前端的差異。

- ***前端***是指所有和使用者介面有關的範疇，這個介面可以是指所有裝置的瀏覽器，甚至是應用程式，以瀏覽器的介面來說，就包含了網頁的內容（HTML）、網頁的樣式（HTML）、監聽、控制、改變網頁的程式（JavaScript）。前端會把使用者要做的事，例如搜尋網頁、填寫表單等，發出 request 給後端。

- ***後端***則是接收 request 之後，做一切背後要做的事，主要是處理功能的程式邏輯和收到資料之後的資料儲存，後端主要的技術有處理功能邏輯的程式語言，如 PHP、Python、Ruby on Rails 等，以及儲存資料的資料庫，如 MySQL。

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

2. `vim` 用 vim 在終端機上編輯文字檔
    `vim 檔案名稱`

3. `file` 檢查檔案類型
    `file 檔案名稱`
    範例：
     `file hw1.md`
    `hw1.md: UTF-8 Unicode text, with CRLF line terminators`


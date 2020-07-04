## 請以自己的話解釋 API 是什麼
API 是可以和外部的程式、服務交換資料和取得功能的接口介面及標準。例如，有了某個網站的 API 就可以取得該網站的資料或 CRUD 之類的功能。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

### 403 Forbidden
和 401 的區別是：401 是客戶端沒有發送認證或是認證訊息錯誤，所以回傳 401 錯誤，客戶端可以重新嘗試發送正確的認證訊息，但 403 是客戶發送了可識別的認證，但伺服器認定這個認證訊息對應的用戶是沒有權限訪問對應的資源的。

### 502 Bad Gateway
指伺服器嘗試執行請求時，收到無效的回應，一般瀏覽網站遇到此錯誤時，可能的原因為 ISP 發生故障，如中華電信故障；或是被防火牆阻擋等。

### 504 Gateway timeout
指伺服器嘗試執行請求時，連線逾時，無法及時收到回應。例如公司的 DNS 無法順利解析對方網站，等待的時間過長就丟回封包顯示連線逾時。 

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

API URL: https://restaurantPlatform.com/

| 說明 | Method | Path | 參數 | 範例 |
| ---- | ---- | ---- | ---- | ---- |
| 列出所有餐廳 | GET | /restaurants | _limit:最大回傳資料數量，Default:10，Max: 100 | /restaurants?_limit=10 |
| 列出單一餐廳 | GET | /restaurants/:id | 無 | /restaurants/66 |
| 新增餐廳 | POST | /restaurants | name: 店名 |	 |
| 更改餐廳 | PATCH |	/restaurants/:id | name: 店名 |  |
| 刪除餐廳 | DELETE | /restaurants/:id | 無 |  |
## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

DNS（Domain Name System）是一套系統，可以做到在 domain name 與 IP address 之間的轉換，例如在瀏覽器輸入 nicolakacha.tw 的時候，透過 DNS 可以對應到該網域所指向的 IP address 是 18.221.13.145，這樣的查詢稱為 DNS 的正解，而從 IP address 查詢到 domain name，則稱為 DNS 的反解。

Google DNS 官網列出了三個使用 Google Public DNS 的理由：
1. Speed up your browsing experience
2. Improve your security
3. Get the results you expect  with absolutely no redirection

使用者透過 Google 提供的 DNS 服務，能夠擁有更安全更快的上網體驗。但同時 Google 可以收集到大量使用者在網路上的軌跡資料並加以利用，Google 在其隱私權政策 [Ads and data](https://safety.google/privacy/ads-and-data/) 一章中宣稱：「Google 不會把您的個人資訊賣給任何人，收集資料只是為了在 Google 的自家產品上、合作夥伴的網站上、以及行動裝置的應用程式上提供您相關的廣告。」並且再次重申不會販賣資料：「這些廣告支持我們的服務並得以使其對大眾免費，您的個人資料不會被賣掉。」雖然 Google 沒有在名義上「賣掉」我們的資料，但可以以各種形式將這些資料「提供」給第三方，以實現他們所說的：
> We use data to make ads more relevant and useful to you.

針對這樣的隱私權疑慮，歐盟相應提出了嚴格的隱私權規範 GDPR，而全美最嚴厲的 CCPA（加州消費者隱私法案）也已於今年實施，其中 CCPA 對「販賣資料」一詞給了更明確的規範：
 
> 在本法案下，除了某些例外情況，任何出於「有價值上的考慮」所進行的個人資訊交換都會被視為販賣資料。任何販賣資料的公司，都必須提供其使用者拒絕資料被賣的機會，並在網站上設置「請不要賣掉我的資料」的按鈕。

相較之下，同樣提供 DNS 服務且標榜比 Google DNS 更快速的 Cloudflare，其[隱私條款](https://developers.cloudflare.com/1.1.1.1/privacy/public-dns-resolver/)在對資料的使用上就寫得相對清楚：
> Cloudflare will not sell or share Public Resolver users’ personal data with third parties or use personal data from the Public Resolver to target any user with advertisements.

所以使用者若位於隱私權法尚未健全的地區，在選擇是否要使用 Google DNS 時，要特別注意並做出取捨。

參考資料：
- [Why does Google provide free open DNS servers? - Quora](https://www.quora.com/Why-does-Google-provide-free-open-DNS-servers)
- [Why you shouldn't be using Google DNS - Reddit](https://www.reddit.com/r/pihole/comments/c3uuy8/why_you_shouldnt_be_using_google_dns_instead_you/)
- [Google Says It Doesn’t 'Sell' Your Data. Here’s How the Company Shares, Monetizes, and Exploits It.](https://www.eff.org/deeplinks/2020/03/google-says-it-doesnt-sell-your-data-heres-how-company-shares-monetizes-and)
- [Are you ready? Here is all the data Facebook and Google have on you](https://www.theguardian.com/commentisfree/2018/mar/28/all-the-data-facebook-google-has-on-you-privacy)


## 什麼是資料庫的 lock？為什麼我們需要 lock？
在了解資料庫的 lock 之前要先說明一下資料庫的 transaction。Transaction 可以視為一組對資料庫的讀寫操作，例如交易、轉帳等。舉例來說，小明在網路上賣一本《前端秘笈》，若小花下單了，小明賣場的書就減少一本而歸零，而小花就獲得了一本書，這就是一個 transaction 單元。

但如果今天小花和小王同時下單了這本《前端秘笈》，就可能會發生超賣的情形，一本書賣給了兩個人，這種情況稱為 race condition。為了確保 transaction 不會發生 race condition，也就是確保買賣數量的正確性，我們可以建立一個標記，這個標記的用途是當這本書被第一個買家買的時候，告知其它準備買這本書的買家，這本書正在被賣哦，其它買家就要等待該買家買完之後，才可已執行動作，當然，因為只有一本，所以第一個買家買完了，之後的人就不能再買了，就可以避免超賣的問題。

回到資料庫的場景來說，為了確保多筆 transaction 在資料讀取和寫入的時候不會互相影響的隔離性（isolation），進而達到資料的一致性（concurrency），我們可以在資料讀取或寫入時做上一個記號，其它 transaction 就要根據這個記號，來決定是否要等待該記錄狀態結束或是直接讀取資料，而這個記號就是資料庫中的 lock。

參考資料：
- [資料庫的交易鎖定 Locks](https://www.qa-knowhow.com/?p=383)

## NoSQL 跟 SQL 的差別在哪裡？
在理解 NoSQL 是什麼之前，我想先說明什麼是 SQL，SQL（Structured Query Language）是一種跟關聯式資料庫系統（Relational Database）互動的語言，可以透過 SQL 來把資料儲存在有固定欄位的資料表架構裡（Schema），我們透過關聯式資料庫在儲存資料的時候，都需過事先架好 Schema 來建立不同資料表間的關聯。
 ![database](https://i.imgur.com/3WOvN8X.png)
 
但服務上線了以後，我們關聯式資料庫的 Schema 就很難再調整；且一旦資料量大時，設計和變更 Schema 就更困難了。
 
而 NoSQL 的 No，雖然最初的意思是 Non，但目前普遍理解為 Not Only，可以理解為是除了可以透過 SQL 來操作資料庫之外，還能以別的型態來儲存資料。目前 NoSQL 資料庫主流是使用一種 Key-Value 的模式來存取資料，每筆資料就只有一個索引（key）和其對應的值（value），因此可以不需要關聯式資料庫式的 Schema；每筆資料之間沒有關聯性，所以也會盡量避免使用 JOIN 語法。NoSQL 資料庫的資料通常可以任意地調整或分割、也可以分散到不同的 Server 中。也因為這種特性，NoSQL 資料庫不需要高效能和容量較大的硬體設備來維持關聯式資料庫那種複雜的叢集系統，就可以用更低成本實現水平擴充。
 
除了上述所提的 Key-Value 儲存模式之外，NoSQL 資料庫還有其他的類型，主要可分為四類：
 
 1. 鏈值資料庫（Key-Value Database）：這是 NoSQL 資料庫的大宗，主要就是用 Key-Value 的方式來儲存資料，適合需要儲存大量的資料但不需要執行複雜查詢的使用場景；但不適用於需要儲存資料之間的關係時，因為 Key-Value 資料庫不能關聯資料。常見的用途有儲存使用者偏好或是快取等，知名的 Key-Value 資料庫有 Redis 和 DynanoDB 等。
 ![Key-Value Database](https://upload.wikimedia.org/wikipedia/commons/5/5b/KeyValue.PNG)
 *圖片來自[維基百科](https://en.wikipedia.org/wiki/Key%E2%80%93value_database)*

 2. 文檔資料庫（Document-Oriented Database）：以文檔或類似於 JSON 物件的形式儲存資料，每個文檔可以包含許多組資料單元，每組資料都有 name 和其對應的值 value，而 value 的種類可以是各種型態：字串、數字、布林值、陣列、物件等。使用文檔資料庫的好處是，檔案的儲存模式是程式開發者在應用面可以直接使用的文件模型（例如 JSON），也因此應用範圍相當多元，但和 Key-value 資料庫一樣，因為不能關聯資料，所以不能在不同的文檔上添加 Transaction。目前較歡迎的 Document 資料庫為 MongoDB。
 ![Document-Oriented Database](https://webassets.mongodb.com/_com_assets/cms/Relational_vs_DocumentDB-imgngssl17.png)
 *圖片來自 [MongoDB 官網](https://www.mongodb.com/document-databases)*

 3. 列存儲資料庫（Wide-column Store）：在資料表的列和動態的欄位中儲存資料，比關聯式資料庫固定格式的資料表具有更高的彈性，因為每個列中不需要有相同的欄位，可以理解為儲存二維的 key-value 型態。通常運用於物聯網（IoT）或儲存使用者資料上。Cassandra 和 DynamoDB 都屬於這種列存儲資料庫。
 ![Wide-column Store](https://database.guide/wp-content/uploads/2016/06/wide_column_store_database_example_column_family-1.png)
 *圖片來自 [Database.Guide](https://database.guide/)*

 4. 圖形資料庫（Graph Database）：當我們關注每個資料之間的組織網關係時，可以使用圖形資料庫，圖形資料庫使用節點來存放資料實體，並利用邊緣來存放各個實體之間的關係，這個邊緣可以用來描述上下節點的關係、動作等。圖形資料庫適用於社交網絡、詐騙偵測、推薦引擎等使用場合，Neo4j 和 JanusGraph 都屬於這類圖形資料庫。
 ![Graph databases](https://d1.awsstatic.com/product-marketing/Neptune/Neptune-Diagram_social-v3.20da6a2fc4f25a212e995894b52e721b403b58ba.png)
  *圖片來自 [Amazon Neptune 官網](https://aws.amazon.com/cn/neptune/)*

參考資料：
- [What is NoSQL?](https://www.mongodb.com/nosql-explained)
- [Nosql資料庫的分類及應用場景](https://www.itread01.com/content/1549348208.html)
- [什麼是 NoSQL？](https://aws.amazon.com/tw/nosql/)


## 資料庫的 ACID 是什麼？
ACID 是為了保證 transaction 是正確可靠的，所必須符合的四個特性：
- 原子性（Atomicity）：一個 transaction  中的所有操作，或者全部失敗，或者全不成功，不會有部份成功或失敗的情況發生。意即不可分割的零和關係。
- 一致性（Consistency）：在 transaction 的開始之前和結束以後，都要遵循資料庫事先定義好的規則，以維持資料的一致性。
- 隔離性（Isolation）：任何的 transaction 都不會影響另一筆 transaction，確保多筆 transaction 同時執行時不會因為互相影響而導致資料不一致。
- transaction 成功之後，對於資料庫的修改是永久的，即使系統故障也不會遺失。

參考資料：
- [ACID by Wikipedia](https://zh.wikipedia.org/wiki/ACID)
- [What does ACID mean in Database Systems?](https://database.guide/what-is-acid-in-databases/)
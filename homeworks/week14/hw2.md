## 佈署好的網站：
- [餐廳網站](http://restaurant.nicolakacha.tw/)
- [部落格](http://blog.nicolakacha.tw/)

## 卡關記錄心得：
練習在 AWS EC2 上佈署網站時，我主要參考了這篇很棒的筆記：[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)，然而在實際佈署的時候還是遇到有卡好幾關，我本地端的電腦作業系統是 Windows 10，以下我遇到的一些問題可能使用 MAC 的同學不一定會遇到，我就把自己遇到的問題記錄下來，給大家當作一點參考。

第一步設定 AWS EC2 主機照著筆記做下去就 OK，接下來就要用 SSH 來連到遠端的 EC2 主機來建立 LAMP 環境，我一開始是使用自己比較習慣的 Command Line 工具 Cmder，一步步小心地輸入指令。更新 ubuntu、安裝 Tasksel 和下載 LAMP Server 也都沒什麼問題。

直到輸入 `$ sudo apt install phpmyadmin`，Cmder 在過程中開始狂閃，不知道怎麼進行下去，於是就關掉 Cmder 重開，把 phpmyadmin 解除安裝之後重新試一次，還是一樣在安裝 phpmyadmin 的時候出問題。最後發現[有人用 Cmder 也有一樣的困擾](https://v2ex.com/t/604895)，決定棄用 Cmder 改用 Git Bash，安裝 phpmyadmin 就正常了。

之後就順利進行到最後一步，測試用 git clone 放檔案到 var/www/html 的目錄也沒問題，決定來用 FileZilla 用 FTP 傳檔案到 EC2 主機去，原本以為是輸入剛才步驟 4 設定的帳號和密碼就可以登入了，結果連不上，最後查到建立自己的站台並告知金鑰的位置，這個金鑰就是設定 AWS EC2 遠端主機時步驟 6 拿到的金鑰，之後就可以順利連線了：
 
![](https://static.coderbridge.com/img/Nicolakacha/f773d81c63384dfdb804a0c3c385b37b.png)

home/var/www/html 這個目錄會是佈署網站內容的根目錄，只要把靜態網頁或資料夾放在這裡，在網址列輸入就可以看到頁面了，可以看到裡面有一個現成的 index.html，這是 Apache2 伺服器預設的頁面，也就是輸入自己的 IPv4 Public IP 時會看到的畫面：
 
![](https://static.coderbridge.com/img/Nicolakacha/4b3a75f3c96248f6bf45f72e948916c2.png)

在 home/var/www/html 裡面又多放了事先準備好的 restaurant 資料夾：
 
![](https://static.coderbridge.com/img/Nicolakacha/53e142d117854122b1888ebf36074425.png)
 
### 佈署靜態網站
只要在瀏覽器輸自己的 `IPv4 IP address` 加上 /restaurant 就可以看到 restaurant 裡的 index.html 了：
![](https://static.coderbridge.com/img/Nicolakacha/d323fe01b84f4e70a4874bde5db863b1.png)
 
### 佈署動態網站
要佈署部落格這樣的動態網站，還需要先配置好資料庫，這裡就在瀏覽器輸入 `IPv4 IP address` 加上 /phpmyadmin 來進入 phpmyadmin，我們一樣可以建立使用者、資料庫和 table 等，這裡我使用匯入匯出的功能把本地端原本的 table 匯入進去，一點擊匯入就噴出了錯誤：
`count(): Parameter must be an array or an object that implements Countable`
查了資料發現是一個小 bug，只要在系統裡修改這兩個檔案，就不會在跳錯誤警告了：

./libraries/plugin_interface.lib.php 在 551 行，將 count($options) > 0 拿掉：
`sudo vim /usr/share/phpmyadmin/libraries/plugin_interface.lib.php`
```
if ($options != null ) {
    // …..
}
```

./libraries/sql.lib.php#613 在 613 行，替換以下判斷式：
`sudo vim /usr/share/phpmyadmin/libraries/sql.lib.php`
```
|| ((count($analyzed_sql_results['select_expr']) == 1)
```

之後就可以把本地端的資料庫匯出並匯入到遠端資料庫了，
 
![](https://static.coderbridge.com/img/Nicolakacha/d2ca2eaf3a534a458e75c66457bb292b.png)

之後要做的事就和佈署靜態網站一樣，把 blog 專案資料夾放到 home/var/www/html 這個目錄下，但記得連線資料庫的 conn.php 裡面的連線資料也要配對正確，完成之後就可以在瀏覽器輸入 `IPv4 IP address`/blog 來看到我們佈署好的網站：
 
![](https://static.coderbridge.com/img/Nicolakacha/b048e73e72c14dd288bcfdcf0eee5038.png)

到這裡就可以實際操作看看 CRUD 確認寫入資料庫是不是都正常，以上就完成了靜態和動態網站的佈署啦！

### 把域名連結到主機

我的域名是在 Gandi 上，不同的域名服務商可能有不同的操作，但設定 DNS 應該是大同小異的，以 Gandi 來說，進入到管理介面後，只要在左側域名的區塊點選買好的域名，就可以在區域檔記錄裡面來設定 DNS：
 
![](https://static.coderbridge.com/img/Nicolakacha/2a22db04bf10467fa8307b7bee694e36.png)

> A record points a name to an IP. 
> CNAME record can point a name to another CNAME or to an A record.

第一步要做的就是把 A 記錄的值輸入為我們主機的 IPv4 DNS 或是 Public IP，這樣域名就可以導向我們主機的位置了。接著可以設定 CNAME，CNAME 和 A 記錄不同的地方在於，A 記錄是指向實際的 Address，而 CNAME 是設定別名，用來將別名對應至網域名稱，例如指向 A 記錄，或是指向另一個 CNAME。這裡可以先建立一個 www 的 CNAME 來指向我的網域名。這樣不論輸入 www.nicolakacha.tw 或是就都可以連到我的主機了。

接著可以在瀏覽器測試一下，輸入 nicolakacha.tw/restaurant 的確有連到餐廳網站，輸入 nicolakacha.tw/blog 也有連到部落格網站了。

### 設定子網域

完成基本的域名設定之後，我想來設定子網域，想要用 restaurant.nicolakacha.tw 和 blog.nicolakacha.tw 這樣的網址型式來搜到我的餐廳網站和部落格，然而這裡我又卡關了。不知道是要去 AWS 管理介面的哪裡設定，在 AWS 試了很久還是弄不好，後來查到資料，原來要用在 Ubuntu 主機上建立或修改 Apache Vitural Host 的方式來達成：

先移動到 /etc/apache2/sites-available/ 這個資料夾，這是放 vitural host 設定檔的地方：
```
cd /etc/apache2/sites-available/ 
``` 

預設的設定檔檔名是 000-default.conf，我們複製一份命名為 restaurant.conf：
```
sudo copy 000-default.conf restaurant.conf
```

開啟設定檔來修改：
```
sudo nano restaurant.conf
```
一定要修改的有 ServerName，這是我們要設定的子網域的網址，和 DocumentRoot，這是這個子網域要去拿裡找檔案的目錄，ServerAlias, ErrorLog 和 CustomLog 也可以一起修改：
 
![](https://static.coderbridge.com/img/Nicolakacha/be1ddeb8a4d24aa9b8585ca9d2d3a66d.png)

設定完之後存檔，輸入這個指令來啟用這個新的設定檔：
```
sudo a2ensite restaurant.conf
```

之後重新啟動 Apache2 伺服器：
```
sudo service apache2 restart
```

blog 的子網域也是比照辦理，這樣我們就完成兩個子網域的 vitural host 設定啦，接著要回去 Gandi 的管理介面設定 CNAME，把 CNAME 都指向我們的主網域，主機就會依 vitural host 設定檔來查找該子網域對應的檔案位置：
 
![](https://static.coderbridge.com/img/Nicolakacha/7e2f76492106415b82bfe51b655c2ac6.png)

完成後也可以利用[線上工具](https://mxtoolbox.com/SuperTool.aspx)來確認是否 DNS 設定有生效，現在在瀏覽器輸入 restaurant.nicolakacha.tw 也找得到餐廳網站啦，這樣我們就完成子網域的設定了。
 
![](https://static.coderbridge.com/img/Nicolakacha/f405a3cf7b3e4c158611bfcb024a9567.png)

### 總結
其實寫起來篇幅很短，但自己在研究的時候還蠻崩潰的 QQ，可能是因為自己對網路架構的概念還是很薄弱，又對 Ubuntu 很陌生，所以過程中一直很小心翼翼，因為有地方沒有弄好又要重頭來過。佈署一共花了三天。覺得最重要的事情是不要急躁，如果在腦中同時想各種問題，或是一直想著「要快點佈署好」這件事，就會很煩躁而產生無力感。應該要把遇到的問題一個個地列出來，查資料找解決辦法，再一個個地解決，這樣一步步地進行下去，最終就能順利把佈署搞定惹！


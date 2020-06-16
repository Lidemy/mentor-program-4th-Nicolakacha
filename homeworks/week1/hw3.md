## 教你朋友 CLI

Hi h0w 哥，

先跟你說結論吧，你要用 command line 做的事只要這樣就可以了：

0. 打開 command line 程式
1. `mkdir wifi` //建立 wifi 資料夾
2. `cd wifi` // 切到 wifi 資料夾內
3. `touch afu.js` // 在裡面建立 afu.js 這個檔案 


另外，下面這份 CLI 新手筆記也可以看一下哦
看完以後，應該就能掌握基礎的 command Line 用法啦！

## CLI 簡介

命令列介面（CLI），是一套用純文字下指令給電腦的工具。我們平時在電腦上熟悉的那些視窗、圖示和按鈕的介面，則可以統稱圖形使用者介面（GUI）。雖然在使用上，CLI 沒有 GUI 來的直覺和易用，但一些系統或程式，並沒有 GUI 可以使用，所以必須要熟悉 CLI 這套工具。

## CLI 程式

- Git bash
- Cmder

## 基本指令介紹

每個指令其實都是該功能英文的簡稱，記住這點，之後會方便記憶每個指令    

1. `pwd` 印出現在的位置  
    - Print Working Directory  

2. `cd` 切換目錄  
    - Change Directory 用來切換移動到不同的資料夾  
  
    - 用法：  
        - `cd C:\Users\chkan` // 移動到 Users 下的 chkan 資料夾  
        - `cd C:\Program Files\Git` // 移動到 Program Files 下的 Git 資料夾  
        - `cd ..` // 移動到上一層資料夾  
        - `cd ~` // 移動到根目錄  
  
    - 切換硬碟槽不使用 cd，直接輸入該槽名稱即可：  
        - `D:\` // 從 C 槽切換至 D 槽  

3. `ls` 列出檔案
    - List 用來檢視當前目錄下的所有檔案  

    - 用法：  
        現在位置在 C:\Users\hihi\文件\abc，要檢視該目錄下的所有檔案，輸入 ls，可以看到該 abc 資料夾內的所有檔案有哪些  
        
    - 常用參數  
        - -a：列出所有檔案，包含隱藏檔( 開頭為 . 的檔案)  
        - -h：可將檔案容易以易讀式呈現(EX：GB、KB、…)  
        - -l：將資料以列表形式呈現，並且包含檔案細部資料(屬性、權限、時間…)  
        - -r：反向排序(原先是從a->z變成z->a)  
        - -R：將目錄下的子目錄檔案一起列出(白話：整個資料夾檔案列出)  
        - -S：用檔案大小排序  
        - -t：用時間排序  

4. `man` 使用說明
    - Manual 用來查看某項指令的功能使用說明
    - 用法：`man 要查找的指令`
    - Windows 沒有 man，可以用 help 取代 

5. `touch` 新建檔案 / 修改檔案時間
    - 新建檔案
        `touch 要新建的檔案名稱.可選副檔名`
    - 修改檔案時間
        `touch 現有的檔案` //檔案時間會被更新成當前時間
    
6. `rm` 移除檔案
    - Remove
    - 用法：`rm 要移除的檔案`

7. `rmdir` 移除資料夾
    - Remove Directory
    - 用法
        `rmdir abc` //移除 abc 資料夾
    - `rm -r` 也可以移除資料夾
        `rm -r abc`

8. `mkdir` 建立資料夾
    - Make Directory 
    - `mkdir test` //建立名為 test 的資料夾

9. `mv` 移動檔案 / 更改檔案名稱
    - Move
    - 用法
        - 移動檔案：`mv 要移動的檔案 要移進的資料夾`
            - 要移進的資料夾可用"相對路徑"或"絕對路徑"
            - 相對路徑：相對於現在當前位置的路徑
            - 絕對路徑：以根目錄為起始點，完整寫下路徑
        
        - 改檔名：`mv 要改名的檔案 要改的名字`

10. `cp` 複製檔案
    - Copy
    - 用法
        - 複製檔案：`cp 要複製的檔案 複製出來的檔案名`
        - 複製資料夾：`cp -r 要複製的資料夾 複製出來的資料夾名`

11. `cat` 查看檔案內容
    - 可以在 Command Line 裡直接查看檔案內容

12. `grep` 抓住搜尋的字
    - 用法
        `grep 要搜尋的關鍵字 在哪個檔案裡搜尋`

13. `wget` 下載檔案
    - 非內建指令，Windows 使用者可以把 wget 下載下來之後安裝，並把 wget.exe 放進 System32 的資料夾就可以使用了
    - [如何在 Windows 上安裝 wget](https://www.notion.so/Command-Line-32ebda4bdc2142bfbe67852a4d62375c#29b18c59a6414701ae43aadec97c855b)

14. `curl` 送出 request
    - 主要可以用來測試 API


## 組合技

- `>` 將某指令的結果存到某檔案內
     - Redirection
     - 用法
        - `ls -al > list_result` //把 ls -al的內容，輸出到 list_result
        - `echo "123" > 123.txt` //把 echo 印出的內容，輸出生成 123.txt 
     - 輸出的檔案可以是新建的檔案或已存在的檔案要，注意在對已存在的檔案使用 `>` 時，檔案內容會被全部覆蓋，如果只想要新增內容，可以用 `>>`

- `>>` 將某指令的結果新到某檔案內
    - 用法
        - `echo "append to the end of the file" >> 123.txt` // 把 echo 印出來的內容，新增到 123.txt（舊的內容不會被蓋過去）

- `|` 將左側輸出變成右邊輸入
    - Pipe
    - 用法
        - `cat hello | grep o > result.txt` //把 hello 內的內容輸出，輸入至 grep 功能，搜尋出含有 o 的內容，最後存到 result.txt 這個檔案

- `echo` 將資訊輸出到螢幕或檔案
    - 用法
        - echo "This is a test." > test.txt // test.txt 檔案內容會產生 This is a test


## VIM 編輯器
- 可以用來直接進入檔案裡面修改內容
    `vim 檔案名稱`

- 切換模式：
    - 按 i 進入編輯模式 // 在編輯模式才可以修改和打字
    - 按 esc 跳出編輯模式進入普通模式
    - 按 :q 結束
    - 按 :wq 存檔後結束

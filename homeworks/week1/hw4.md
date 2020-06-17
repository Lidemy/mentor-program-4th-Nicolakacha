## 跟你朋友介紹 Git

# Git 版本控制 原理 & 基本指令

## 版本控制的原理

版本控制，就是把檔案所有歷史紀錄的版本都保存下來，方便之後比對、回顧。
以前在做報告的時候，不知道大家有沒有類似的經驗，把新修改的檔案另存成一個個新檔案然後在檔名上加上各種...

- 期末報告.doc
- 期末報告_2.doc
- 期末報告_最終版.doc
- 期末報告_確定版.doc
- 期末報告_最終確定版.doc

最後變得自己和組員都搞不清楚哪個是哪個...
於是我們有了 Git 這套工具來更有系統的管理檔案的版本歷程

## 用簡易版控來模擬 Git

為了讓大家在之後能更了解 Git 在做什麼，這裡就用熟悉的資料夾、檔案、和複製貼上功能做一個和 Git 類似的簡易版控。

首先我們有一個協作的專案資料夾
    
- `專案資料夾`
    - index.html
    - main.css
    - index.js

一開始只有你一個人在自己的電腦做，昨天稍微修改了 main.css 和 index.js，為了方便管理，你複製出一份新的，命名為`專案資料夾_2`。

我們把剛才那個`專案資料夾_2`放在雲端空間上，開始和 A、B 同事一起協作吧：

- A 同事把檔案抓下來，修改了一點 index.html，於是在自己的電腦裡面複製出一份新的叫做`專案資料夾_3`的檔案

- B 同事也把檔案抓下來修改了一點 index.js，也在自己的電腦裡面複製了一個叫`專案資料夾_3`的檔案

- 要在上傳同步回去的時候就發生都叫`專案資料夾_3`但修改內容不一樣的衝突情形了

- 於是我們決定給每個人的版本一個亂碼，已識別不同的版本：
    - A 同事的`專案資料夾_3`變成了 fdfjkdslfhds
    - B 同事的`專案資料夾_3`變成了 jkojidesahal

- 但是要如何識別這兩個亂碼的資料夾是誰的版本，是什麼時候的版本呢？於是我們做一個`版本紀錄.txt`以記錄不同的版本資訊：
    - 06/14 14:30, A, fdfjkdslfhds
    - 06/14 12:50, B, jkojidesahal

- 在新增一個文件`最新版本.txt`用來記錄最新版本
    - latest: jkojidesahal

- 我們可以把不需要進行版本控制的檔案移出資料夾，例如剛才紀錄版本資訊的 txt 檔，完成之後我們的版本控制目錄就會像這樣啦：
    - `最新版本.txt`
    - `版本紀錄.txt`
    - `fdfjkdslfhd`
        - index.html
        - main.css
        - index.js
    - `jkojidesahal`
        - index.html
        - main.css
        - index.js

其實 Git 在做的事和上面的流程非常相似，等到我們實際操作過一次，就會覺得原來 Git 是一套很直觀易用的工具惹！

## 基礎指令

1. 版本控制初始化

    `git init` 
    - 為此資料夾建立 git 版本控制初始化，該資料夾內會多一個 .git 的隱藏資料夾

2. 查看版本控制狀態

    `git status`
    - 可以查看有沒有檔案有做修改了但還沒 commit
    - 也可以查到現在在哪一個 branch 
    - 按 q 可以跳出

3. 加入檔案至版本控制

    `git add 要加入的檔案`
    `git add .`  //把此資料夾內全部檔案到加入版本控制

4. 把檔案移出版本控制

    `git rm --cached 要移出的檔案`

5. 新建一個版本

    `git commit -m "要為該版本建立的版本訊息"`
    `git commit -am "要為該版本建立的版本訊息"` // 可以同時完成 add 和 commit，但是新加入此資料夾的檔案不適用哦

6. 檢查歷史紀錄

    `git log` // 可以看到每一個版本的 message、該版本號碼（對，長得像一串亂碼的那個）豪和建立日期
    `git log --oneline`  // 顯示版本的列表


7. 穿越過去與未來

    `git checkout 那串版本號`  // 可以回到過去的版本
    `git checkout master`  // 切換到主 branch

8. 我在 .gitignore，請忽略我

    在版本控制的資料夾內，可以指定某些檔案不一起做版本控制。
    
    - 步驟：
        1. `touch .gitignore`  // 建立一個 .gitignore 檔案
        2. `vim .gitignore`  // 用 vim 開啟 .gitignore，在裡面把要忽略的檔名打進去

    這樣做的好處是，就算使用 git add .，加進 .gitignore 的檔案也不會被加入版本控制內，往後不需要每次都要手動移出了。

## 基礎 Git 流程

1. 在 CLI 中切換到要做版本控制的資料夾的位置
    `cd D:\文件\test-git-demo`

2. 讓 Git 初始化
    `git init`

3. 建立 .gitignore，決定那些檔案要忽略不做版控
    `touch .gitignore` // 建立 .gitignore
    `vim .gitignore` // 打開 .gitignore，把不要版控的檔案名稱打進去

4. 把檔案加入版本控制 COMMIT
    `git add .` // 一次加全部
    `git add 檔案名稱` 

5. 把所有修改生成一個版本 ADD
    `git commit -m "message"`
    `git commit -am "message"` // 可以同時完成 4 和 5

6. 在各版本中穿梭
    `git checkout 版本號碼`  // 可以切換各個版本
    `git checkout master`  // 切換到主 branch


## 多人協作就用 Branch 

1. 我們可以把整個專案稱為 repository，之後簡稱 repo，這裡面一開始就存在的 branch 叫做 master，也就是主要的 branch。

2. 多人同時開發時，我們可以基於 master 再複製建立出不同的 branch 出來個別進行開發。

3. 開發完再合併進去 master，如此就可以在不影響 master 的情況下同時進行不同支線的開發，譬如開一條 branch 是用來修復 bug，另一條 branch 是在做增加新功能，各自開發完之後在合併融入 master。

## Branch 指令

1. 建立名為 new-branch 的新 branch
    `git branch new-branch`

2. 查查看現在有哪些 branch
    `git branch -v`

3. 刪除 branch
    `git branch -d 要刪除的 branch`

4. 切換到另一個 branch
    `git checkout 要切到哪一個 branch`

5. 把 branch 給合併進來
    `git merge 要合併進來的 branch`
    // 確認自己在哪一個 branch，git merge 這裡要填入的是你要把哪一個 branch 合併進來

6. Conflict 檔案衝突
    - 兩個 branch 內的同一個檔案都有被更改，因為電腦不知道要以哪一個為準，要 merge 的時候就會發生衝突
    - 發生衝突時，手動把該檔案打開，可以看到它把有衝突的地方標記起來，只要手動修改出，確認需要的內容，並存檔，再重新 merge 一次即可順利解決 conflict

## GitHub
可以理解為放 repo 的雲端

1. `push`
    - 把本地的 repo 同步推上 GitHub 
    `git remote add origin https://github.com/Nicolakacha/test.git`
    `git push -u origin master`

2. `pull`
    - 把 GitHub 上的 repo 同步拉下到本地
    `git pull origin master`

3. `clone`
    - 把別人的 repo 下載一份到本地
    - 不能修改，也不能 push 回去別人 GitHub 上的 repo
    `git clone <SSH address>`

4. `fork`
    - 把別人的 repo 複製一份叉到自己的 GitHub 上

## 多人協作的 Git & GitHub 流程

1. 在 GitHub 上 fork 別人的 repo

2. push 到 local

3. 開新 branch 

4. 開始在這個新 branch 裡面開發 <- 做上面的基礎 Git 流程

5. 開發完之後 push 自己的 GitHub
    
6. 發起 pull request 請求把這個 branch merge 到原本的 repo 裡

7. 在上面討論，等待對方確認是否可以 merge

8. merge 成功，刪掉 branch

## GitHub Page

GitHub Page 是 GitHub 上免費提供可以做靜態網頁展示的的功能：
[GitHub Page](https://pages.github.com/) 

GitHub 官方建議的工作流程參考
[GitHub Flow](https://guides.github.com/introduction/flow/)

## 狀況實例

1. 打錯字了，想改 commit message
    `git commit --amend`

2. 我 commit 了但後悔了
    `git reset HEAD^ --hard`  // 完全刪除該 commit
    `git reset HEAD^ --soft` // 剛才那個修改的檔案還是在，只是在沒有 commit 的狀態

3. 還沒 commit 但後悔了想回到原來的狀態
    `git checkout -- <file>`  // 拋棄剛才的改變
    `git checkout .`  //拋棄剛才所有檔案的改變

4. 改 branch 的名稱
    `git branch -m <new_branch_name>`

5. 想把本地端沒有的遠端 branch 抓下來 
    - `git checkout <github_branch_name>`
    - 但如果遠端的 branch 如果不是從 local 端發出，或在 local 端之外有新的 commit，就沒辦法直接下載完整的 branch，要先 `git fetch` 抓到遠端 branch 的新狀況，然後把新狀況 `merge` 進我們 local 端的 branch，或更直接的開一個同名的 branch 並 `pull` 下來之後，才是完整的 branch。
    - [參考資料](https://gitbook.tw/chapters/github/pull-from-github.html)

## Git Hook
預先設計好腳本，在某件事發生的時候觸發我們寫好的腳本
像是可以在 commit 之前檢查程式碼有沒有符合規範
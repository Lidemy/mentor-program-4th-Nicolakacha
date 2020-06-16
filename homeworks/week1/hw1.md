## 交作業流程

1. 把課綱 `fork` 一份到自己的 GitHub 上

2. 打開 CLI 工具，把自己 GitHub 上的課綱 `clone` 到本機
    `git clone https://github.com/Lidemy/mentor-program-4th-你的github名稱.git`

3. 切換到 mentor-program-4th 這個資料夾後，新開一個 branch，在新的 branch 上寫作業
    `git branch week1` // 可以用當週週次命名 branch

4.  把修改完的檔案 add 到版本控制裡面並 commit 新建一個版本
    `git commit -am "自訂的版本名稱"`
    
    如果有新建的檔案，用`git commit -am`是無效的，要先`git add 檔案名稱`，再做`git commit -m "自訂的版本名稱"`

5. 把在本機的 branch 推回 GitHub
    `git push origin week1`

6. 在 GitHub 上建立一個 pull request

7. 到學習系統的作業列表按新增作業，貼上 pull request (PR) 的連結

8. 如果 pull request 被 merged，就代表作業被改完了

9. 把遠端的 master 拉下來和本機的 master 同步

    `git pull origin master`

10. 把本地原來新增出來用來寫作業的 branch 刪除

    `git branch -d week1`
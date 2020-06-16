#!/bin/bash
read -p "請輸入要建立的檔案數: " x
for ((i=1; i<=x; i++))
do
    touch $i.js
done
echo "檔案建立完成";


# #!/bin/bash
# read -p "請輸入要建立的檔案數: " x
# for x in $(seq 1 $x)
# do
#     touch $x.js
# done
# echo "檔案建立完成";



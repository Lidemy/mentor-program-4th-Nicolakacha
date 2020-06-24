// 現在有一個排序好的陣列 arr，裡面的元素都是正整數而且保證不會重複。

// 給你一個數字 n，請寫出一個函式 search 回傳 n 在這個陣列裡面的 index，沒有的話請回傳 -1。


function search(arr, searchNumber){
    var L = 0
    var R = arr.length - 1
    while(L <= R){
        var M = Math.floor((L+R)/2) 
        if (arr[M] === searchNumber){ //如果剛好 M 就是 
            return M
        } else if (arr[M] > searchNumber){
            R = M - 1
        } else {
            L = M + 1
        }
    }
    return -1
}

console.log(search([1, 3, 10, 14, 39], 14)) //=> 3
console.log(search([1, 3, 10, 14, 39], 299)) //=> -1
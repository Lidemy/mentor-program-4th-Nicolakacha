function join(arr, concatStr) {
    var answer = arr[0]
    for (var i=1; i<arr.length; i++){
        answer += (concatStr + arr[i]) 
    }
    return answer
}

function repeat(str, times) {
    var newStr = ""
    for (var i=0; i<times; i++){
        newStr += str
    }
    return newStr
}

// console.log(join(['a'], '!'));
// console.log(join([1, 2, 3], ''));
// console.log(join(["a", "b", "c"], "!"));
// console.log(join(["a", 1, "b", 2, "c", 3], ','));

// console.log(repeat('a', 5));
// console.log(repeat('yoyo', 2))

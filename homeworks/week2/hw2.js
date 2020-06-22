function capitalize(str) {
    var newStr = str[0].toUpperCase()
    for (var i=1; i<str.length; i++){
        newStr += str[i]
    }
    return newStr
}

console.log(capitalize('huli'));
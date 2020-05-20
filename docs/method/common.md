
## 常见方法函数
```js
export const debounce = () => {

}



export const throttle = () => {
    
}


export const deepCopy = () => {

}

export const setRem = () => {
    
}

```

### 获取url search参数
```js
export const getSearchParams = (name, search) => {
    if(!search){
        return null;
    }else{
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }
}
```

### 过滤数组中重复数据 
```js
export const getUniqueArr = (arr, newArr) => {
    let num,
        me = this

    if ( arr.length >0 && arr.indexOf(num = arr.shift()) == -1 ) {
        newArr.push(num)
    }

    arr.length && unique(arr, newArr)
}
```

### 获取文件后缀名
```js
export const getFileSuffix = (fileName='') => {
    let index = fileName.lastIndexOf('.')
    return fileName.substring(index + 1)
}
```

## 数据类型校验

### String
### Object
### Array
### Number
### Boolean
### Function
### Promise
```js
export const isArray = () => {

}


export const isObject = () => {

}


export const isNumber = () => {

}


export const isFunction = () => {

}


export const isPromise = () => {

}


export const isString = () => {

}




```



## 手机号、邮箱等校验

### 是否是手机
```js
export const isMobile = (mobile) => {
    return /^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(mobile)
}

```

### 是否是邮箱
```js
export const isEmail = ( email ) => {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)
}
```

### 是否为空

```js
export const isBlank = (value)=> {
    var v = /\S/
    return !v.test(value)
}
export const isEmpty = (data, excludeZero = true, needTrim = false) => {
    if(typeof data == 'string'){
        if(needTrim){
            return !data.trim()
        }else{
            return !data
        }
    }
    if(typeof data == 'number' && !excludeZero){
        if(data === 0) return true
    }
    if(Object.prototype.toString.call(data).slice(8, 14) == 'Object'){
    return Object.keys(data).length == 0
    }
    if(Object.prototype.toString.call(data).slice(8, 13) == 'Array'){
    return data.length == 0
    }
    return !data
}
```



## 设备类型校验

### 是否是ios
### 是否是安卓
### 是否是某个版本的app



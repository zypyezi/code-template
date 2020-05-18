
## 下载文件

常用于直接根据需要下载文件的地址，进行文件的下载。
```js
export const downloadFile = (src) => {
    let $iframe = document.createElement('iframe')
    $iframe.setAttribute('src', src)
    $iframe.style.display = 'none'
    document.body.appendChild($iframe)
}


```

<details>
<summary>DEMO</summary>
<demo1 />
</details>

但是遇到过一种情况，上述方法会导致页面崩溃。
现象描述：由于下载文件的地址其实是一个接口，在访问接口正常的时候，自然没有问题，后端返回流文件自动下载。但是当访问出错的时候，就出现了问题，因为后端返回的是一个包含错误情况的json，而不是流文件。所以需要兼容这两种情况

```js

export const downloadFileByUrl = (url, errMsg) => {
    try {
        let id = 'iframe-for-download'
        let ifr = document.getElementById(id)
        let hasAppend = true

        if (!ifr) {
            hasAppend = false
            ifr = document.createElement('iframe')
        }

        // 错误会进入这个方法
        ifr.onload = function() {
            try {
                // 后端返回的json在 ifr.contentDocument.body 里面
                const content = JSON.parse(ifr.contentDocument.body.innerText)
                console.log(content.msg || errMsg || '文件下载出错')
            } catch(err) {
                // TODO
            }
            document.body.removeChild(ifr)
        }
        ifr.id = id
        ifr.src = url
        ifr.style.display = 'none'

        if (!hasAppend) {
            document.body.appendChild(ifr)
        }
    } catch (ex) {
        // TODO
    } finally {
        // TODO
    }
}

```




## 2


## 3

## 4

## 5

## 6


## 7
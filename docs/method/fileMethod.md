
## 上传文件


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

还有一种情况，常见于图片的下载。不是后端返回一个流文件，无法直接利用浏览器下载。可以先将图片转化为canvas，再转为base64的形式进行下载
``` js
export const downloadImage = (url) => {
    var canvas = document.createElement('CANVAS'), 
    ctx = canvas.getContext('2d'), 
    img = new Image; 
    img.crossOrigin = 'Anonymous'
    img.onload = function(){ 
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img,0,0)
        var dataURL = canvas.toDataURL('image/png')
        let image = new Image()
        image.src = dataURL
        let a_link = document.createElement('a')
        a_link.href = image.src
        a_link.download = '二维码'
        a_link.click()
    }
    img.src = url
}
```


<details>
<summary>DEMO</summary>
<demo1 />
</details>



## 各种图片格式的相互转化

```js
/**
 *  将图片转化成base64
 * @param {*} dataURL 
 */
export const convertImgToBase64 = (url, callback, outputFormat) => { 
    var canvas = document.createElement('CANVAS'), 
    ctx = canvas.getContext('2d'), 
    img = new Image; 
    img.crossOrigin = 'Anonymous'; 
    img.onload = function(){ 
        canvas.height = img.height; 
        canvas.width = img.width; 
       ctx.drawImage(img,0,0);
       var dataURL = canvas.toDataURL(outputFormat || 'image/png'); 
       callback.call(this, dataURL); 
       canvas = null;
    };
    img.src = url;
}
```

```js

/**
 * base64 转化成blob
 * @param {*} base64Data 
 */
export const convertDataURItoBlob = (base64Data) => {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);
    else
        byteString = unescape(base64Data.split(',')[1]);
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
}

```

```js
/**
 *  dataUrl 形式的文件转化为二进制buffer
 * @param dataURL
 * @returns {ArrayBuffer}
 */
export const convertDataUrlToArrayBuffer = (dataURL) => {
    var REGEXP_DATA_URL_HEAD = /^data:.*,/;
    var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
    var binary = atob(base64);
    var arrayBuffer = new ArrayBuffer(binary.length);
    var uint8 = new Uint8Array(arrayBuffer);
    uint8.map((item, index) => {
        uint8[index] = binary.charCodeAt(index)
    })

    return arrayBuffer;
}
```

``` js
/**
 *  将array buffer 转化为 dataUrl
 * @param arrayBuffer
 * @param mimeType
 * @returns {string}
 */
export const convertArrayBufferToDataUrl = (arrayBuffer, mimeType) => {
    var uint8 = new Uint8Array(arrayBuffer);
    var data = '';

    uint8.map((item, index) => {
        data += String.fromCharCode(value);
    })
    // TypedArray.prototype.forEach is not supported in some browsers.

    return 'data:' + mimeType + ';base64,' + btoa(data);
}
```


## 压缩图片
```js
/**
 * 压缩图片，压缩结果图片格式为jpg
 * @quality 压缩质量 默认为0.8
 * @param type 返回类型  blob | file
 */
export const compressImage = (file, quality = 0.8, type = 'blob') => {
    return new Promise((resolve, reject) => {
        // 图片小于1M不压缩
        if (
            file.size < Math.pow(1024, 2) ||
            !(window.Blob && window.FileReader && window.atob)
        ) {
            resolve(file);
        }
        const _msg = console.log("图片处理中");
        const name = file.name; // 文件名
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            const src = e.target.result;
            const img = new Image();
            img.src = src;
            img.onload = e => {
                const w = img.width;
                const h = img.height;
                // ios 对canvas的尺寸大小有限制，超出会导致图片压缩失败，所以这里限制图片最大的长宽
                const MAX = 3000;
                let maxSide = Math.max(w, h, MAX);
                let _w = w;
                let _h = h;
                switch (maxSide) {
                    case w:
                        _w = MAX;
                        _h = (MAX * h) / w;
                        break;
                    case h:
                        _h = MAX;
                        _w = (MAX * w) / h;
                        break;
                    default:
                        _w = w;
                        _h = h;
                }
                // 生成canvas
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                // 创建属性节点
                const anw = document.createAttribute("width");
                anw.nodeValue = _w;
                const anh = document.createAttribute("height");
                anh.nodeValue = _h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);

                // 铺底色 PNG转JPEG时透明区域会变黑色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, _w, _h);

                ctx.drawImage(img, 0, 0, _w, _h);
                // quality值越小，所绘制出的图像越模糊
                const base64 = canvas.toDataURL("image/jpeg", quality); // 图片格式jpeg或webp可以选0-1质量区间

                // 返回base64转blob的值
                console.log(
                    `原图${(src.length / 1024).toFixed(2)}kb`,
                    `新图${(base64.length / 1024).toFixed(2)}kb`
                ); // eslint-disable-line no-console
                // 去掉url的头，并转换为byte
                const bytes = window.atob(base64.split(",")[1]);
                // 处理异常,将ascii码小于0的转换为大于0
                const ab = new ArrayBuffer(bytes.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                let _file = new Blob([ab], { type: "image/jpeg" });
                _file.name = name;

                _msg();
                if(type == 'blob'){
                    resolve(_file);
                }
                if(type == 'file'){
                    let newFile = new window.File([_file], _file.name, {type: _file.type})
                    newFile.uid = file.uid
                    resolve(newFile);
                }
            };
            img.onerror = e => {
                _msg();
                reject(e);
            };
        };
    });
}
```

## 格式化
格式化文件大小
```js
/**
 *  根据文件byte格式化文件大小
 */
export const computeFileSize = (size) => {
    if (size < 1024) {
        return size + 'B'
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB'
    } else {
        return (size / 1024 / 1024).toFixed(2) + 'M'
    }
}
```

## 加签字水印
``` js
export const addTag = (url) => {
    let canvas = document.createElement('CANVAS')
    let ctx = canvas.getContext('2d')
    let img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function(){
        canvas.width = 200
        canvas.height = 200
        ctx.drawImage(img, 0,0)
        ctx.font="20px microsoft yahei";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText("my images",100,100)
        let a_link = document.createElement('a')
            a_link.href = canvas.toDataURL('image/png')
            a_link.download = '二维码'
            a_link.click()
    }

    img.src = url
}

```




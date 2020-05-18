<template>
    <div>
        <input 
            v-model="url"
            placeholder="请输入下载文件的地址"  
            class="input"
        />
        <div>
            <div @click="download" class="btn">下载文件</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'demo1',
    data(){
        return {
            url: ''
        }
    },
    methods:{
        download(){
            console.log(3434, this.url)
            let $iframe = document.createElement('iframe')
            $iframe.setAttribute('src', this.url)
            $iframe.style.display = 'none'
            document.body.appendChild($iframe)
        }
    }
}
</script>

<style>
    .input{
        margin-top: 20px;
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        width: 300px;
    }
    .btn{
        margin-top: 20px;
        color: #fff;
        background-color: #1890ff;
        border-color: #1890ff;
        text-shadow: 0 -1px 0 rgba(0,0,0,.12);
        -webkit-box-shadow: 0 2px 0 rgba(0,0,0,.045);
        box-shadow: 0 2px 0 rgba(0,0,0,.045);
        text-align: center;
        display: inline-block;
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
    }
</style>
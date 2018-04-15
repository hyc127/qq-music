<template>
    <div class="content">
        <div class="navbar">
            <a class="navbar-brand col-12 col-md-3 m-0 p-0 mb-3 mb-md-0"><img src="//y.gtimg.cn/mediastyle/yqq/img/logo.png" class="brand-img"></a>
            <div class="col-md-6 col-8 d-flex flex-row justify-content-between h-100 p-0">
                <router-link to="/population" class="nav-item">流行</router-link>
                <router-link to="/hotsong" class="nav-item">热歌</router-link>
                <router-link to="/mv" class="nav-item">MV</router-link>
                <router-link to="/album" class="nav-item">歌单</router-link>
                <router-link to="/bestlove" class="nav-item">欧美</router-link>
            </div>
            <div class="col-md-3 col-4 d-flex flex-nowrap justify-content-center p-0">
                <a href="#"><span class="search-icon"></span></a>
                <input type="text" class="search-input" placeholder="search" ref="input" @input="search($event.target.value)" @click="isShow=!isShow, $event.target.value=''" @keydown.down.prevent="change(nowIndex)" @keydown.up.prevent="upchange(nowIndex)" @keydown.enter="g_play">
                <div class="info-box d-flex flex-column p-0" :class="{ show: isShow }" @mouseover="isShow=false" @mouseout="isShow=true">
                    <span v-for="(singer,index) in info" :key="index" class="search_response my-1" :class="{ beSelect : index === nowIndex }" @click="g_play2(index)"> {{ singer.singer }}  {{ singer.name }}  </span>
                </div>
            </div>
        </div>
        <div><router-view></router-view></div>
    </div>
            
</template>

<script>
    export default {
        data: function() {
            return { info: [], isShow : true, nowIndex : -1}
        },
        methods: {
            search: function(value) {
                if (value==='') return;
                $.ajax({
                    url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=jsonp&key='+ value +'&jsonpCallback=？&format=jsonp',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonp: 'jsonpCallback',
                    success: function(data) {
                        this.info = [];
                        data.data.song.itemlist.forEach(function(val){
                            this.info.push(val);
                        },this)
                    }.bind(this)
                })
            },
            change: function(nowIndex) {
                var total = this.info.length;
                nowIndex === total - 1 ? this.nowIndex = 0 : this.nowIndex++;
            },
            upchange: function(nowIndex) {
                var total = this.info.length;
                nowIndex === 0 ? this.nowIndex = total - 1 : this.nowIndex--;
            },
            g_play: function() {
                this.isShow = true;
                player.play(this.info[this.nowIndex].mid);
            },
            g_play2: function(val) {
                this.isShow = true;
                player.play(this.info[val].mid);
                
            }
        }
    }
</script>

<style>

.active {
  background: #31c27c;
  color: #fff;
}
.search-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url(/src/static/search.svg);
    background-size: 16px 16px;
    margin-top: 6px;
}
.nav-item {
    display: inline-block;
    width: 20%;
    line-height: 3em;
    height: 3em;
    text-decoration: none!important;
}

.search-input {
   width: 5em; 
   border: 0;
   outline: 0;
}

.router-link-active {
    background: #31c27c;
    color: #fff!important;
}

.info-box {
    font-size: 12px;
    position: absolute;
    right: 0;
    width: 20em;
    height: 16em;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 6px gray;
    margin-top: 29px;
    z-index: 2;
}

.search_response {
    height: 2em;
    line-height: 2em;
}

.show {
    display: none!important;
}

.beSelect {
    background: #17a2b8;
    color: #fff;
}

</style>


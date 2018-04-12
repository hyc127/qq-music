<template>
  <div id="app" class="pt-3">
    <head-component class="mb-3"></head-component>
    <!-- <div class="container p-0">
      <div class="navbar d-flex flex-row justify-content-between p-0 mb-5">
        <a class="navbar-brand col-md-2 col-bg-12 m-0 p-0"><img src="//y.gtimg.cn/mediastyle/yqq/img/logo.png" class="brand-img"></a>
        <div class="col-md-6 col-bg-12 d-flex flex-row justify-content-between h-100">
          <div class="col-2 p-0 active"><a class="nav-item">音乐馆</a></div>
          <div class="col-3 p-0"><a class="nav-item">我的音乐</a></div>
          <div class="col-3 p-0"><a class="nav-item">客户端</a></div>
          <div class="col-2 p-0"><a class="nav-item">音乐号</a></div>
          <div class="col-2 p-0"><a class="nav-item">VIP</a></div>
        </div>
        <div class="col-md-4 col-7 m-auto mb-3 d-flex flex-nowrap">
          <a href="#" class="mr-2 nav-item"><span class="search-icon"></span></a>
          <a href="" class="mr-auto nav-item">登录</a>
          <button class="btn btn-success btn-sm">开通绿钻豪华版</button>
        </div>
      </div>

      <div class="music_box col-8 m-auto">
        <div class="musci_item">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="//y.gtimg.cn/mediastyle/global/img/album_300.png" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">some infomation</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// var player = new QMplayer();
// // 播放歌曲

// // 监听事件
// player.on("play", function () { })

// import jquery from 'jquery'

// $.ajax({
//   url : 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?key=毛不易',
//   type: 'get',
//   dataType: 'jsonp',
//   jsonp : 'jsonpCallback',
//   success: function(data){
//     var item = data.data.song.itemlist;
//     var arr = [];
//     for(var i=0; i<item.length;i++){
//       arr.push(item[i].id)
//     }
//     for(var i=0; i<item.length;i++){
//       console.log(item[i].name);
//     }
//     // player.play(arr);
//   }
// })

// $.ajax({
//   type: "get",
//   async: false,
//   url: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&tpl=macv4&v8debug=1&jsonCallback=jsonCallback",
//   dataType: "jsonp",
//   jsonp: "callback",
//   jsonpCallback: "jsonCallback",
//   scriptCharset: 'GBK',//设置编码，否则会乱码
//   success: function(data) {
//     var song = data[0].List[0].songlist[0].songid;
//     // player.play(song);
//   },
//   error: function() {
//     alert('fail');
//   }
// });

// export default {
//   name: 'app',
  
// }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

@media screen and (max-width:375px) {
  body {
    font-size: 12px;
  }
}


/* .navbar {
  height: 46px;
}

.brand-img {
  max-width: 100%;
  height: auto;
}


.nav-item {
  line-height: 46px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.active {
  background: #31c27c;
  color: #fff;
}

.search-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  background-image: url(./static/search.svg);
  background-size: 16px 16px;
} */
</style>

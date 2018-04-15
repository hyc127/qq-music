<template>
  <div class="bestlove">
      <div class="drgons">
          <img src="/src/static/timg.jpeg" alt="">
      </div>
      <div class="item d-flex flex-row flex-wrap">
        <div class="music-container col-12 col-md-8 mt-4">
                <ul class="music-info-list d-flex flex-row text-left pb-3">
                    <li class="music-name col-5 col-md-6">歌曲</li>
                    <li class="music-singer col-5 col-md-4">歌手</li>
                    <li class="music-time col-2">时长</li>
                </ul>
                <ul class="music-songs d-flex flex-row justify-content-between text-left py-3" v-for="(song, index) in songs" :key="index">
                    <li class="music-name col-5 col-md-6" >
                        <span v-text="song.songName">1 Demons</span>
                        <div class="music-controler">
                            <i class="icon-play" @click="playM(index)"></i>
                        </div>
                    </li>
                    <li class="music-singer col-5 col-md-4">imagine dragons</li>
                    <li class="music-time col-2">02:55
                        <i class="incon-delete"></i>
                    </li> 
                </ul>
        </div>
        <div class="row col-12 col-md-4 align-items-center mt-4">
            <a class="album-img col-3 col-md-12">
                <img :src="nowImage" alt="">
            </a>
            <div class="col-9 col-md-12">
                <div><span>歌曲名: Warriors</span></div>
                <div><span>歌手名: Imagine Dragons</span></div>
                <div><span>专辑名: Warriors</span></div>
            </div>
        </div>
      </div>
  </div>
</template>


<script>
export default {
  data: function() {
      return { songs:[], nowIndex:0, nowImage:''}
  },
  methods: {
      init: function() {
          var _this = this
          $.ajax({
              url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=63935390053060046&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=imagine%20dragon&g_tk=5381&jsonpCallback=?&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
              type: 'get',
              dataType: 'jsonp',
              jsonpCallback: 'playlistinfoCallback',
              success: function(data){
                  var url = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'
                  var songs = data.data.zhida.zhida_singer.hotsong
                  songs.forEach(function(val){
                      _this.songs.push({
                          pid: url + val.f.split('|')[22] + '.jpg',
                          songMID: val.songMID,
                          songName: val.songName,                                     
                      })
                  })
                  _this.nowImage = _this.songs[0].pid
              }
          })
      },
      playM: function(index) {
          this.nowImage = this.songs[this.nowIndex].pid
          player.play(this.songs[index].songMID)
          this.nowIndex = index
      }
  },
  created: function() {
          this.init();
      }
}
</script>


<style>
.bestlove {
    position: relative;
    color: rgba(225, 225, 225, 0.8);
}

@media only screen and(max-width: 374px) {
    .bestlove {
        font-size: 12px;
    }
}

.bestlove img {
    max-width: 100%;
    height: auto;
}

.item {
    position: absolute;
    width: 100%;
    top: 0;
}

.bestlove {
    background-color: #333;
    background-size: 100% auto;
    height: 100vh;
}

.music-info-list, .music-songs {
    text-shadow: 0 0 5px dimgray;
    position: relative;
    border-bottom:1px solid #ccc;
    
}

.music-controler {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: .5em;
    height: 100%;
}

.icon-play {
    display: inline-block;
    width: 36px;
    height: 36px;
    margin-top: -8px;
    cursor: pointer;
    background-image: -webkit-image-set(url(https://y.gtimg.cn/mediastyle/yqq/img/icon_list_menu.png?max_age=2592000&v=4566a1a62ecad72fe9b9205d1ad62d2b) 1x,url(https://y.gtimg.cn/mediastyle/yqq/img/icon_list_menu@2x.png?max_age=2592000&v=4566a1a62ecad72fe9b9205d1ad62d2b&v=155713ca49dc652a6ada08b0492f088a) 2x);
}

.icon-play:hover {
    background-position:  -120px 0;
}

</style>

<template>
    <div class="music_box text-muted" @lick="getM">
        <div class="music_item mb-2" v-for="(songs, index) in singer" :key="index">
          <div class="card d-flex flex-row justify-content-between align-items-center">
              <h5 class="col-1"><span class="badge badge-secondary" v-text="index+1">1</span></h5>
            <img class="col-1 rounded" height="auto"  :src="songs.songimgid" alt="Card image cap">
            <div v-text="songs.songname" class="col-4">物是人非</div>
              <div v-text="songs.singername" class="col-3">成龙</div>
              <div class="card-text col-2" v-text="songs.songtime">03：42</div>
              <a href="#" class="btn btn-sm btn-primary col-1" @click="playM(index)">播放</a>
          </div>
        </div>
      </div>
</template>


<script>

import jquery from 'jquery'

// function getDate() {
//     var date = new Date();
//     var year = date.getFullYear() 
//     var month = date.getMonth() < 9? '0' + (date.getMonth()+1) : (date.getMonth()+1) 
//     var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
//     var newDate = year + '-' + month + '-' + day
//     return newDate;                          
// }

// var today = getDate();

export default {
    data : function() {
        return {
            singer : [],
        }
    },
    methods: {
        playM: function(val) {
            player.play(this.singer[val].songid, function(err){
                alert(err);
            })
        },
        getTimeL: function(val) {
            var s = (val/60).toFixed(0)<10?'0'+(val/60).toFixed(0):(val/60).toFixed(0) 
            var m = (val%60).toFixed(2)<10? '0'+(val%60).toFixed(0) : (val%60).toFixed(0)
            return s + ':' + m;
        }
    },
    computed: {
        getM: function() {
            return $.ajax({
                type: "get",
                async: false,
                url: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&topid=4&type=top&song_begin=0&song_num=30&&jsonpCallback=?&format=jsonp",
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "jsonCallback",
                scriptCharset: 'GBK',
                success: function(data) {
                    var songs = data.songlist;
                    var src = 'https://y.gtimg.cn/music/photo_new/T002R150x150M000';
                    for(var i = 0; i < songs.length; i++ ){
                        this.singer.push({
                            songname: songs[i].data.songname,
                            singername: songs[i].data.singer[0].name,
                            songid: songs[i].data.songid,
                            songimgid: src + songs[i].data.albummid +'.jpg',
                            songtime: this.getTimeL(songs[i].data.interval)
                        })
                    }
                }.bind(this),
                error: function() {
                    alert('fail')
                }
            })
        }
    }
}


</script>

<style>

</style>


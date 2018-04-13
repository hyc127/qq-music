<template>
    <div class="d-flex flex-row flex-wrap mt-4">
        <div class="card col-4 col-md-3 col-bg-2" v-for="(song,index) in singer" :key="index">
            <img :src="song.songimgid" class="card-img-top">
            <div class="card-body">
                <p class="card-title m-0" v-text="song.songname">Card title</p>
                <p class="card-text m-0" v-text="song.singername"></p>
                <p class="text-muted m-0" v-text="song.songtime"></p>
                <a class="btn btn-sm btn-secondary" @click.prevent="playM(index)">播放</a>
            </div>
        </div>
    </div>
</template>


<script>
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
                url: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&topid=26&type=top&song_begin=0&song_num=32&g_tk=2071019791&jsonpCallback=?&format=jsonp",
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "jsonCallback",
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
                }.bind(this)
            })
        }
    },
    created : function() {
        this.getM;
    }
}
</script>

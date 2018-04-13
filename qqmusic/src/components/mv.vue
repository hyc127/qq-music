<template>
    <div class="MVcontainer d-flex flex-row flex-wrap justify-content-around">
        <div id="mod_player" class="video" :class="{ show: ishow }"></div>
        <div class="mv-item col-4 col-md-3 p-1 d-flex flex-column justify-content-between" v-for="(mv,index) in singer" :key="index">
            <img :src="mv.picurl" class="img-thumbnail mv_pic">
            <p v-text="mv.mvtitle" class="m-1 text-muted">明天你好</p>
            <p class="text-muted m-1" v-text="mv.singername">广告音乐</p>
            <p class="text-muted" v-text="mv.listennum">2018-4-9</p>
            <button @click="playMV(mv.vid)" class="btn btn-success p-1">播放mv视频</button>
        </div>
    </div>
</template>


<script>
 
    export default {
       data: function() {
           return { singer : [], ishow: true}
       },

       methods: {
           getMV: function() {
               $.ajax({
                   url: 'https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag?format=jsonp&type=2&year=0&area=0&tag=0&pageno=0&pagecount=20',
                   type: 'get',
                   dataType: 'jsonp',
                   jsonpCallback: 'MusicJsonCallback',
                   success: function(data) {
                       var MV_items = data.data.mvlist;
                       MV_items.forEach(function(val){
                           this.singer.push(
                               {
                                   mvtitle : val.mvtitle,
                                   picurl: val.picurl,
                                   listennum: val.listennum,
                                   singername: val.singername,
                                   vid: val.vid,
                               }
                           )
                       },this)
                   }.bind(this)
               }
            )
        },
        playMV : function(vid) {
            this.ishow = false;
            var video = new tvp.VideoInfo();
            video.setVid(vid);
            var MVplayer = new tvp.Player();
            MVplayer.create({
            video: video,
            modId: "mod_player",
            vodFlashSkin: "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf",  //精简皮肤        
            autoplay: true,   //是否自动播放
        });
        $('body').keydown(function(event){
            if(event.which=== 13 || event.which === 27){
                history.go(0);
            }
        }.bind(this))            
    }
},
    created: function() {
        this.getMV()
    }
}
</script>

<style>

.MVcontainer {
    position: relative;
    font-size: 12px;
}

.video {
    position: fixed; /*绝对定位*/ 
    top:0; /*距顶部50%*/ 
    left:0; 
    width:100%;
    height:100%;
    z-index:2;
}

.mv_pic {
    max-width: 100%;
    height: auto;
}

.mv-item {
    box-shadow: 3px 3px 5px gray;
}

.show {
    display: none;
}
</style>

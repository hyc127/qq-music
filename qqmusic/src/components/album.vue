<template>

    <div class="radioContainer">

        <div class="tv d-flex align-items-center mx-auto col-10 p-0" @mouseover="isHover = true" @mouseout="isHover = false">
        
            <div class="preP">
                <img :src="album[preP]" alt="">
            </div>
        
            
            
            <div class="pre">
                <img :src="album[pre]" alt="">
            </div>

            
        
            <div class="center">
                <img :src="album[nowPage]" alt="">
            </div>
        
            
    
            <div class="next">
                <img :src="album[next]" alt="">
            </div>
    
            
        
            <div class="nextN">
                <img :src="album[nextN]" alt="">
            </div>

            <button class="control-left btn btn-secondary" @click="go('left')" v-show="isHover">《</button>
            <button class="control-right btn btn-secondary" @click="go('right')" v-show="isHover">》</button>
        
        </div>

        <div class="col-10 p-0 mx-auto mb-1" v-for="(radio,index) in radios" :key="index">
            <p class="text-muted text-left display-3 m-2" v-text="radio.name"></p>
            <div class="radio-items d-flex flex-row flex-wrap justify-content-between mb-3">
                <div class="radio-item p-1 col-4 col-md-3" v-for="(radioList,radiosListIndex) in radio.radioLists" :key="radiosListIndex">
                    <div class="img-container">
                        <img :src="radioList.radioImg" class="radio-item-img img-fluid">
                        <img @click="playRadio(radioList.radioId)" src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9" class="cover">
                        <i class="mask"></i>
                    </div>
                    <p class="my-1" v-text="radioList.radioName"></p>
                    <p class="text-muted">播放量：{{ radioList.listenNum }} </p>
                </div>
            </div>
        </div>
        <div class="btn-group btn-grop-sm">
            <button class="btn btn-secondary rounded" @click="playPrev">prev</button>
            <button class="btn btn-secondary rounded" @click="playNext">next</button>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return { album : [], radios : [], nowPage: 2, preP: '', pre: '', center: '', next: '', nextN: '', direct: 'left', speed:300, delay:5000, flag: false, isHover: false}
    },
    methods: {
        init: function() {
            $.ajax({
                url: 'https://c.y.qq.com/v8/fcg-bin/musicmall.fcg?jsonpCallback=?&format=jsonp&cmd=pc_index_new',
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'jsonpCallback',
                success: function(data) {
                    var banner = data.data.banner;
                    banner.forEach(function(val) {
                        this.album.push(val.picurl)
                    },this)
                }.bind(this)
            })

            $.ajax({
                url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg?channel=radio&format=jsonp&page=index&jsonpCallback=?',
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'jsonpCallback',
                success: function(data){
                    var radios = data.data.data.groupList;
                    radios.forEach(function(val){
                        var radios = val.radioList
                        var radiosLists = []
                        radios.forEach(function(val){
                            radiosLists.push({
                                listenNum: val.listenNum,
                                radioId: val.radioId,
                                radioImg: val.radioImg,
                                radioName: val.radioName
                            })
                        })
                        this.radios.push({
                            name: val.name,
                            radioLists: radiosLists
                        })
                    },this)
                }.bind(this)
            })
        },
        initPage: function() {
            var total = this.album.length;
            this.pre = this.nowPage != 0 ? this.nowPage - 1 : total - 1;
            this.preP = this.pre != 0 ? this.pre - 1 : total - 1;
            this.next = this.nowPage != total - 1 ? this.nowPage + 1 : 0;
            this.nextN = this.next != total - 1 ? this.next + 1 : 0;
        },
        turn : function(direct) {
            var total = this.album.length
            if(direct === 'left') {
                this.nowPage = this.nowPage == total - 1 ? 0 : this.nowPage + 1
            }else{
                this.nowPage = this.nowPage == 0 ? total - 1 : this.nowPage - 1
            }
            this.initPage();
        },
        move: function(dir) {
            if(this.flag) return
            this.flag = true
            var t = this.speed
            var _this = this
            if (dir === 'left') {
                $('.pre').animate({ left: '-50%'},t,()=> { $('.pre').css('left',0); _this.turn('left'); _this.flag = false})
                $('.center').animate({ left:0, width: '50%' },t, () => $('.center').css({ width:'68%', left:'16%' }))
                $('.next').animate({ left:'16%', width:'68%' },t, () => $('.next').css({ left:'50%', width:'50%'}))
                $('.nextN').animate({ left: '50%'}, t, ()=> $('.nextN').css('left','100%'))
            } else {
                    $('.preP').animate({ left: 0 }, t, () => { $('.preP').css('left','-50%'); _this.turn('right'); _this.flag = false})
                    $('.pre').animate({ left: '16%', width: '68%'},t ,() => $('.pre').css({'left' : 0, 'width': '50%'}))
                    $('.center').animate({ width: '50%', left: '50%' },t, ()=> $('.center').css({ 'width': '68%', left: '16%' }))
                    $('.next').animate({ left: '100%' }, t, () => $('.next').css('left', '50%'))
                }
            },
        
        
        start: function() {
            this.stop()
            var _this = this
            this.autoPlay = setInterval(function(){
                _this.move(_this.direct)
            }, _this.delay);
        },
        stop: function() {
            clearInterval(this.autoPlay)
        },
        go : function(dir) {
            if(dir === 'left'){
                this.move('left')
            }else{
                this.move('right')
            }
        },
        playRadio: function(id) {
            var _this = this
            $.ajax({
                url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=getradiosonglist938672363188894&g_tk=5381&jsonpCallback=getradiosonglist938672363188894&&data=%7B%22songlist%22%3A%7B%22module%22%3A%22pf.radiosvr%22%2C%22method%22%3A%22GetRadiosonglist%22%2C%22param%22%3A%7B%22id%22%3A'+ id +'%2C%22firstplay%22%3A1%2C%22num%22%3A10%7D%7D%2C%22radiolist%22%3A%7B%22module%22%3A%22pf.radiosvr%22%2C%22method%22%3A%22GetRadiolist%22%2C%22param%22%3A%7B%22ct%22%3A%2224%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A%2224%22%7D%7D',
                type: 'get',
                dataType:'jsonp',
                success: function(data){
                    var radiolist = data.songlist.data.track_list;
                    var playlist = []
                    radiolist.forEach(function(val){
                        playlist.push(val.mid)
                    })
                    player.play(playlist)
                }
            })
        },
        playPrev: function() {
            player.playPrev()
        },
        playNext: function() {
            player.playNext()
        } 
    },
    created: function() {
        this.init();
        this.initPage();
        this.start();
    }
}
</script>

<style>
    .tv {
        position: relative;
        height: 300px;
        overflow: hidden;
    }
    
    .preP {
        position: absolute;
        width: 50%;
        height: auto;
        left: -50%;
        z-index: 1
    }

    .pre {
        position: absolute;
        width: 50%;
        left: 0;
        z-index: 1
    }

    .next {
        position: absolute;
        width: 50%;
        right: 0;
        z-index: 1
    }

    .nextN {
        position: absolute;
        width: 50%;
        right: -50%;
        z-index:0
    }

    .center {
        position: absolute;
        left: 16%;
        width: 67%;
        box-shadow: 0 0 .8em dimgray;
        z-index: 2
        
    }
    img {
        max-width: 100%;
        height: auto;
    }

    .control-left {
        position: absolute;
        left: 0;
        bottom: 50%;
        z-index: 2;
        opacity: .5;
    }

    .control-right {
        position: absolute;
        right: 0;
        bottom: 50%;
        z-index: 2;
        opacity: .5;
    }

    .img-container {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
        border-radius: .5rem;
    }

    .img-container:hover .cover {
        opacity: 1;
        z-index: 1;
    }

    .img-container:hover .mask {
        opacity: .3;
    }

    .radio-item-img {
        transition: ease-in .3s all
    }

    .cover {
        transition: ease-in .2s all
    }

    .img-container:hover .radio-item-img {
        transform: scale(1.1)
    }

    .cover {
        position: absolute;
        width: 40%;
        left: 30%;
        top: 30%;
        height: 40%;
        opacity: 0;
    }
    
    .mask {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        height: 100%;
        background: black;
        opacity: 0;
    }
    .btn-group {
        position: fixed;
        display: block;
        width: 100%;
        top: 93%;
    }
    
</style>

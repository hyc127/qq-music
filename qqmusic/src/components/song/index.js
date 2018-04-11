import song from './song.vue'

const songComponent = {
    install: function(Vue) {
        Vue.component('song-component', song)
    }
}

export default songComponent
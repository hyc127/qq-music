import head from './head'

const headComponent = {
    install: function(Vue) {
        Vue.component('head-component', head)
    }
}


export default headComponent


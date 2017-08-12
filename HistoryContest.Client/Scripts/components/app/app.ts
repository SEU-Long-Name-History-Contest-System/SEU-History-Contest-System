import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';



@Component({
    components: {
       // MenuComponent: require('../navmenu/navmenu.vue.html'),
        LoginComponent: require('../login/login.vue.html'),
        AnsComponent: require('../ans/ans.vue.html')

    }
})

export default class AppComponent extends Vue {
}

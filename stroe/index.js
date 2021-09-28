import Vuex from 'vuex';
import Vue from 'vue'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        address_id:'',
        user:{}
    },
    getters:{
        get_address(state){
            return state.address_id
        },
        get_user(state){
            return state.user
        }
    },
    mutations:{
        set_address(state,val){
            state.address_id=val;
        },
        set_user(state,val){
            state.user=val;
        }
    },
    actions:{
        set_address({commit},val){
            commit('set_address',val);
        },
        set_user({commit},val){
            commit('set_user',val)
        }
    }
})
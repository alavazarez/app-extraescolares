import Acom from '../api/Acom'
export default{
    namespaced: true,
    state: {
        acoms:{},
        error:false
    },
    getters: {
        acoms(state){
            return state.acoms;
        },
    },
    mutations: {
        SET_ACOMS(state, payload){
            state.acoms = payload;
        }
    },
    actions: {
        async getAcomData({commit}){
            try {
                let response = await Acom.getAcomData();
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_ACOMS', response.data);
            } catch (error) {
                console.log(error);
            }      
        }
    }
}
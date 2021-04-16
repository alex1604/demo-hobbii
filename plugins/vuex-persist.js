import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
    window.onNuxtReady(() => {
        new VuexPersistence({
            key: 'demo-hobbii-vuex',
            storage: window.localStorage,
            reducer: state => state,
        }).plugin(store);
    });
};
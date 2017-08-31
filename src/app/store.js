import { RouterStore } from 'mobx-react-router';

const routingStore = new RouterStore();

const store = {
  routes: routingStore
};

export default store;

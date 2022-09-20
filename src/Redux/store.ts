import {createStore, applyMiddleware} from 'redux';
import reducer from './rootReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //   blacklist: ["unpersistedReducer"]
};

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};

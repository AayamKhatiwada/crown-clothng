import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

// import logger from 'redux-logger'
// import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './root-reducer'

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type){
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state', store.getState());
} 

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV === 'development' && loggerMiddleware,  sagaMiddleware].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; 

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

// export const store = configureStore(
//     {reducer: rootReducer}, undefined,
//     composedEnhancers
// );

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

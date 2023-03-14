import { legacy_createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk"
import { reducer } from "./reducer";

const rootReducer = combineReducers({
    reducer,
   
    
  });

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//       })
//     : 

export const store = legacy_createStore(
    rootReducer,
  applyMiddleware(thunk))
;
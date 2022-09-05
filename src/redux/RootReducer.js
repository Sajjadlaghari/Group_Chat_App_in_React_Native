import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userListReducer } from '../redux/reducers/userListReducer'
import { UserReducer } from '../redux/reducer/userReducer'
import { chatReducer} from '../redux/reducer/chatReducer'

export const RootReducer = () => {
    const store = createStore(combineReducers({
        user: UserReducer,
        message:chatReducer
    }), applyMiddleware(thunk)
    )
    return store;
}
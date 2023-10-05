import { createContext, useReducer} from 'react'


export const UserContext = createContext()


export const userReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_INFO':
            return {
                userinfo: action.payload
            }
        
        case 'SET_USER_INFO':
            return {
                userinfo: action.payload
            }

        default:
            return state
    }

}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {
        userinfo: null
    })

    return (
        <UserContext.Provider value={{ ...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )

}

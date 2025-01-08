import React, {createContext, SetStateAction, useState } from "react"

type AuthContextDataType = {
    userId: string;
    accessToken: string;
    roleList: number[];
}

type AuthContextType = {
    auth: AuthContextDataType;
    setAuth : React.Dispatch<SetStateAction<AuthContextDataType>>
}

const INIT_AUTH = {
    userId: "",
    accessToken: "",
    roleList: []
}

const AuthContext = createContext<AuthContextType| undefined>(undefined);

export const AuthProvider: React.FC <{children: React.ReactNode}> = ({children}) =>{
    const [auth, setAuth] = useState<AuthContextDataType>(INIT_AUTH);

    const authContextValue = {
        auth: auth,
        setAuth: setAuth
    }
    
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;
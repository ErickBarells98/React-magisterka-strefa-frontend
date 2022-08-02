import axios from "axios";
import { createContext, useState, useMemo } from "react";

const UserContext = createContext();

export function UserContextProvider({children}){

    const [user, setUser] = useState({});
    const [isLogged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const login = async (loginValues) => {
        setLoading(true);

        try{
            const response = await axios.post('/api/auth/login',{username: loginValues.email, password: loginValues.password},{headers:{'Content-Type':'application/json'},withCredentials: true}) 
                const logged_user = {
                    username: response.data.email,
                    jwt: response.data.jwt,
                    roles: response.data.roles,
                    userid: response.data.userID,
                    creationDate: response.data.creationDate
                };

                setUser(logged_user);
                localStorage.setItem("userLogged",true);
                setLogged(true);
        }
        catch(err){
            if(err.response.status === 401){
                return "Błedne dane uwierzytelniające."
            }
        }
        finally{
            setLoading(false)
        }
    };

    const logout = () => {
        setLoading(true);
        axios.get('/api/auth/logout',{withCredentials: true})
        .then(response => {
            localStorage.clear();
            setLogged(false);
            setUser({});
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const memoedValues = useMemo(() => ({
        login,
        logout,
        user,
        isLogged,
        loading
    }),[user,isLogged,loading]);

    return(
        <UserContext.Provider value={memoedValues}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;


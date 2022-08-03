import axios from "axios";
import { createContext, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext();

export function UserContextProvider({children}){

    const [user, setUser] = useState({});
    const [isLogged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoadData, setInitialLoadData ] = useState(false);

        const _fechUserByRefreshToken = async () => {
            if(!isLogged){
                const userLogged = localStorage.getItem("userLogged");
                if(userLogged){
                setInitialLoadData(true);
                const { data } = await axios.post("/api/auth/refresh",{},{withCredentials: true});
                return data;
                }
            }
        }
   
    const { data, isLoading } = useQuery(["user"], _fechUserByRefreshToken);
    
    if(!isLoading && data && initialLoadData){
        console.log(data);
        const logged_user = {
            username: data.email,
            jwt: data.jwt,
            roles: data.roles,
            userid: data.userID,
            creationDate: data.creationDate
        };
        setUser(logged_user);
        setLogged(true);
        setInitialLoadData(false);
    }

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
            setUser({});
            setLogged(false);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    //Do przetestowania!
    const setJWT = (newJWT) => {
        setUser(pervState => {
            return {...pervState, jwt: newJWT};
        })
    }

    const memoedValues = useMemo(() => ({
        login,
        logout,
        setJWT,
        user,
        isLogged,
        loading
    }),[user,isLogged,loading]);

    return(
        <UserContext.Provider value={memoedValues}>
            {!isLoading && children}
        </UserContext.Provider>
    )
}

export default UserContext;


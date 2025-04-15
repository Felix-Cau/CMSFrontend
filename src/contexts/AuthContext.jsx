import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const apiUri = "https://localhost:7263/api/users";
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminApiKey, setAdminApiKey] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
        
        
        const storedAdminApiKey = localStorage.getItem('adminApiKey');
        if (storedAdminApiKey) {
            setIsAdmin(true);
            setAdminApiKey(storedAdminApiKey);
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setLoggedInUser(storedUser);
        }

        setLoading(false);
    }, [])

    const signUp = async (firstName, lastName, email, password) => {
        try {
          const res = await fetch(`${apiUri}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({firstName, lastName, email, password})
          });

          if (res.status !== 201)
          {
            const data = await res.json();
            setErrorMessage(data.message);
            console.log(data.message);
            console.log("jag är här");
            return false;
          }

          return true;

        }
        catch {
          setErrorMessage('Unexpected error occured')
          return false;
        }
    }

    const signIn = async (email, password) => {
        try {
            const res = await fetch(`${apiUri}/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            });

            if (res.status === 200)
            {
              const data = await res.json();
              setToken(data.token);
              setLoggedInUser(data.result);
              localStorage.setItem('authToken', data.token)
              localStorage.setItem('user', data.result)

              if (data.isAdmin === true)
              {
                  setIsAdmin(data.isAdmin);
                  setAdminApiKey(data.adminApiKey);
                  localStorage.setItem('adminApiKey', data.adminApiKey)
              }
              return true;
            }

          setErrorMessage(data.message);
          return false;
            
        }
        catch
        {
            setErrorMessage('Invalid email or password');
            return false;
        }
    }

    const signOut = async () => {
        setToken(null);
        setIsAdmin(false);
        setAdminApiKey(null);
        setLoggedInUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminApiKey');
        localStorage.removeItem('user');
        navigate("/signin");
    }

    const authFetch = async (url, options = {}) => {
        const headers = options.headers ? {...options.headers} : {};
        if (token){
            headers['Authorization'] = `Bearer ${token}`;
        }
        return fetch(url, {...options, headers});
    } 

    return (
        <AuthContext.Provider value={{loading, token, isAdmin, adminApiKey, loggedInUser, signUp, signIn, signOut, authFetch}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
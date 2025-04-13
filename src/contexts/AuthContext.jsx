import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const apiUri = "https://localhost:7263/api/users";
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminApiKey, setAdminApiKey] = useState(null);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
              setUser(data.user);
              localStorage.setItem('authToken', data.token)
              localStorage.setItem('user', data.user)

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
        const res = await fetch(`${apiUri}/signout`)
        if (res.ok)
        {
            setToken(null);
            setIsAdmin(false);
            setAdminApiKey(null);
            setUser(null);
            localStorage.removeItem('authToken');
            localStorage.removeItem('adminApiKey');
            localStorage.removeItem('user');
        }
    }

    const authFetch = async (url, options = {}) => {
        const headers = options.headers ? {...options.headers} : {};
        if (token){
            headers['Authorization'] = `Bearer ${token}`;
        }
        return fetch(url, {...options, headers});
    } 

    return (
        <AuthContext.Provider value={{loading, token, isAdmin, adminApiKey, signUp, signIn, signOut, authFetch}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
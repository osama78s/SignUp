import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import auth from '../Firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
    const logOut = () => {
        return signOut(auth);
     }
 
     const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
     }

     const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
     }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider value={{ currentUser, signup, logOut, login, resetPassword }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

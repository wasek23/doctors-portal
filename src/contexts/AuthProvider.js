import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail } from 'firebase/auth';

import firebaseInit from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(firebaseInit);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	}

	const updateUser = (userInfo) => {
		setLoading(true);
		return updateProfile(auth.currentUser, userInfo);
	}

	const loginUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	}

	const popupLogin = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	}

	const passwordReset = (email) => {
		return sendPasswordResetEmail(auth, email);
	}

	const logoutUser = () => {
		setLoading(true);
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const authInfo = { user, loading, createUser, updateUser, loginUser, popupLogin, passwordReset, logoutUser };

	return <AuthContext.Provider value={authInfo}>
		{children}
	</AuthContext.Provider>
}
export default AuthProvider;
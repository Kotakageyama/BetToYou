import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface AuthState {
  uid: string | null;
  userType: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (uid: string, userType?: string) => void;
  signOut: () => void;
}

const initialState: AuthState = {
  uid: null,
  userType: null,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SIGN_IN'; payload: { uid: string; userType?: string } }
  | { type: 'SIGN_OUT' }
  | { type: 'RESTORE_SESSION'; payload: { uid: string; userType?: string } };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        uid: action.payload.uid,
        userType: action.payload.userType || 'user',
        isAuthenticated: true,
      };
    case 'SIGN_OUT':
      return {
        uid: null,
        userType: null,
        isAuthenticated: false,
      };
    case 'RESTORE_SESSION':
      return {
        uid: action.payload.uid,
        userType: action.payload.userType || 'user',
        isAuthenticated: true,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ローカルストレージからセッションを復元
  useEffect(() => {
    const savedAuth = localStorage.getItem('worldid-auth');
    if (savedAuth) {
      try {
        const { uid, userType } = JSON.parse(savedAuth);
        if (uid) {
          dispatch({
            type: 'RESTORE_SESSION',
            payload: { uid, userType },
          });
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem('worldid-auth');
      }
    }
  }, []);

  const signIn = (uid: string, userType = 'user') => {
    const authData = { uid, userType };
    
    // ローカルストレージに保存
    localStorage.setItem('worldid-auth', JSON.stringify(authData));
    
    dispatch({
      type: 'SIGN_IN',
      payload: authData,
    });
  };

  const signOut = () => {
    localStorage.removeItem('worldid-auth');
    dispatch({ type: 'SIGN_OUT' });
  };

  const value: AuthContextType = {
    ...state,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
import React, {createContext, useState} from 'react';
export const AppContext = createContext({});

export function AppProvider({children}) {
  const [appState, setAppState] = useState({
    shouldRefresh: false,
  });

  const updateField = (key, value) => {
    setAppState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...appState,
        toggleRefresh: value => updateField('shouldRefresh', value),
      }}>
      {children}
    </AppContext.Provider>
  );
}

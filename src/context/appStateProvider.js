"use client";
import { getSettings } from "@/app/api/settings/fetch";
import { createContext, useEffect, useState } from "react";

export const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({});

  const updateAppState = (data) => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      ...data,
    }));
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const response = await getSettings();
    const responseData = await response.json();
    if (responseData.data) {
      updateAppState({
        settings: responseData.data,
      });
    }
  };

  return (
    <AppStateContext.Provider value={{ ...appState, updateAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

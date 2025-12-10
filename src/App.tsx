import React from 'react';
import './App.css';
import { TasksList } from "./components/TasksList";
import { useTranslation } from "react-i18next";
import { ModalProvider } from "./providers/ModalProvider";
import { SnackbarProvider } from "notistack";
import {getTheme} from "./shared/config/theme/getTheme";
import { ThemeProvider } from "@emotion/react";
import {StoreProvider} from "./providers/StoreProvider";

function App() {
    const { i18n } = useTranslation();
    const currentTheme = getTheme(i18n.language);

    return (
        <StoreProvider>
            <ThemeProvider theme={currentTheme}>
                <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
                    <ModalProvider>
                        <TasksList />
                    </ModalProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </StoreProvider>
    );
}

export default App;

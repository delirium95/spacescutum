import { createTheme } from '@mui/material/styles';
import { enUS, ukUA } from '@mui/x-data-grid/locales';

export const getTheme = (lang: string) =>
    createTheme({}, lang === 'uk' ? ukUA : enUS);

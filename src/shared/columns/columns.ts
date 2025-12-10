import { GridColDef } from "@mui/x-data-grid";
import {Task} from "../../models/task";
import {useTranslation} from "react-i18next";

export const useTasksColumns = (): GridColDef<Task>[] => {
    const { t } = useTranslation();

    return [
        { field: 'id', headerName: t('id'), width: 120 },
        {
            field: 'userId',
            headerName: t('userId'),
            width: 150,
        },
        {
            field: 'title',
            headerName: t('title'),
            width: 400,
        },
        {
            field: 'completed',
            headerName: t('completed'),
            width: 120,
        },
    ];
};
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {useDeleteTaskMutation, useGetTasksQuery} from "../redux/api/tasksApi";
import {
    DataGrid,
    GridRowParams,
} from '@mui/x-data-grid';
import { useSnackbar } from "notistack";
import {LoadingSpinner} from "./LoadingSpinner";
import {useTasksColumns} from "../shared/columns/columns";
import { useModal } from "../shared/libs/hooks/useModal";
import {Task} from "../models/task";
import {EditTaskForm} from "./forms/EditTaskForm";
import {useEffect, useState} from "react";

export const TasksList = () => {
    const { t } = useTranslation();
    const { data: tasksData, isLoading, isError, isSuccess } = useGetTasksQuery();
    const [tasks, setTasks] = useState<Task[] | null>([]);
    const [deleteTask] = useDeleteTaskMutation();
    const tasksColumns = useTasksColumns();
    const { enqueueSnackbar } = useSnackbar();
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        if (tasksData) setTasks(tasksData);
    }, [tasksData]);

    if (isError) enqueueSnackbar(t('error'), { variant: 'error', preventDuplicate: true});
    if (isSuccess) enqueueSnackbar(t('success'), { variant: 'success', preventDuplicate: true });
    if (isLoading) return <LoadingSpinner/>

    return (
    <>
        <Typography variant={'h2'}>
            {t('tasksList')}
            <Box sx={{ width: '75%' }}>
                <DataGrid
                    rows={tasks ?? []}
                    columns={tasksColumns}
                    onRowClick={(params: GridRowParams<Task>) => {
                        openModal(
                            <>
                                <Box sx={{display: 'flex', gap: 2}}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            openModal(
                                                <>
                                                <EditTaskForm
                                                    task={params.row}
                                                    onSuccess={(updatedTask) => {
                                                        setTasks(prev => prev ? prev.map(t => t.id === updatedTask.id ? updatedTask : t) : null);
                                                        closeModal();
                                                    }}
                                                />
                                                </>
                                            );
                                        }}
                                    >
                                        {t('editTask')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            deleteTask(params.row.id);
                                            setTasks(prev => prev ? prev.filter(t => t.id !== params.row.id) : null);
                                            closeModal();
                                        }}
                                        >
                                        {t('deleteTask')}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={closeModal}
                                    >
                                        {t('close')}
                                    </Button>
                                </Box>
                            </>
                        );
                    }}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-cell': { color: 'blue' },
                        '& .MuiDataGrid-columnHeaders': { backgroundColor: 'lightgray' },
                    }}
                />
            </Box>
        </Typography>
    </>
    );
}
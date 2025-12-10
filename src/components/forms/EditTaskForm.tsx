import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Task } from "../../models/task";
import { useEditTaskMutation } from "../../redux/api/tasksApi";

type FormValues = {
    userId: string;
    id: string;
    title: string;
    completed: boolean;
};

type Props = {
    task: Task;
    onSuccess?: (updatedTask: Task) => void;
};

export const EditTaskForm = ({ task, onSuccess }: Props) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [editTask, { isLoading }] = useEditTaskMutation();

    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            userId: task.userId,
            id: task.id,
            title: task.title,
            completed: task.completed,
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const updatedTask = await editTask(data).unwrap();

            enqueueSnackbar(t('edit_task_success'), { variant: 'success' });

            onSuccess?.(updatedTask);
        } catch (error) {
            enqueueSnackbar(t('edit_task_error'), { variant: 'error' });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
        >
            <Controller
                name="userId"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label={t('user_id')} variant="outlined" required />
                )}
            />

            <Controller
                name="id"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label={t('task_id')} variant="outlined" required disabled />
                )}
            />

            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label={t('title')} variant="outlined" required />
                )}
            />

            <Controller
                name="completed"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!field.value}
                                onChange={e => field.onChange(e.target.checked)}
                            />
                        }
                        label={t('completed')}
                    />
                )}
            />

            <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? t('loading') : t('save')}
            </Button>
        </Box>
    );
};

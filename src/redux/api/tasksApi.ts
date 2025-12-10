import {Task} from "../../models/task";
import {baseApi} from "./baseApi";


export const tasksApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
       getTasks: builder.query<Task[], void>({
            query: () => ({
                url: `/todos`,
                method: 'GET'
            }),
           providesTags: ['Task']
       }),
       editTask: builder.mutation<Task, Partial<Task> & Pick<Task, 'id'>>({
           query: (task) => ({
               url: `/todos/${task.id}`,
               method: 'PUT',
               body: task,
           }),
           invalidatesTags: ['Task']
       }),
       deleteTask: builder.mutation<void, string>({
           query: (id) => ({
               url: `/todos/${id}`,
               method: `DELETE`
           }),
           invalidatesTags: ['Task']
       })
   })
});

export const {
    useGetTasksQuery,
    useEditTaskMutation,
    useDeleteTaskMutation,
} = tasksApi;
import { Provider } from 'react-redux';
import {setupStore} from "@/redux/store/store";

interface StoreProviderProps {
    children: React.ReactNode;
}
const store = setupStore();
export const StoreProvider = ({ children }: StoreProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};

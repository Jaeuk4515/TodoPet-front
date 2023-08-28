import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useState
} from "react";

import axiosRequest from "@/api/index";
import { res, todo, todoCategory } from "@/@types/index";
import { Message, ToastTypes } from "@/@types/todo";

//context로 관리할 객체 타입
export interface TodoContextProps {
    periodTodos?: todoCategory[];
    updateDate: (start: string, end: string) => void;
    updateSelectedDate: (selected: string) => void;
    dateTodos?: todoCategory[];
    selectedDate: string;
    getTodos: (startDate: string, endDate: string) => void;
    updateStatus: (
        contentId: string,
        checkStatus: string,
        content: string
    ) => void;
    message: Message | null;
    isActiveToast: boolean;
}

//context 생성
export const TodoContext = createContext<TodoContextProps>({
    getTodos: () => {},
    periodTodos: [],
    updateDate: () => {},
    updateSelectedDate: () => {},
    selectedDate: "",
    dateTodos: [],
    updateStatus: (
        contentId: string,
        checkStatus: string,
        content: string
    ) => {},
    message: { reward: null, type: ToastTypes.NORMAL, inventoryCount: 0 },
    isActiveToast: false
});

interface TodoContextProviderProps {
    children: React.ReactNode;
}
export default function TodoContextProvider({
    children
}: TodoContextProviderProps) {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [periodTodos, setPeriodTodos] = useState<todoCategory[]>();

    const [dateTodos, setDateTodos] = useState<todoCategory[]>();

    const today = new Date();
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };
    const [selectedDate, setSelectedDate] = useState(formatDate(today));

    const updateDate = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    const updateSelectedDate = (selected: string) => {
        setSelectedDate(selected);
        console.log("투두컨텍스트의 selectedDate: ", selectedDate);
    };

    //기간별 투두 불러오기
    async function getTodos(startDate: string, endDate: string) {
        try {
            const response: res<todoCategory[]> =
                await axiosRequest.requestAxios<res<todoCategory[]>>(
                    "get",
                    `/todoContents?start=${startDate}&end=${endDate}`
                );
            // console.log("categories", response);
            // console.log("Calendar startDate: ", startDate);
            // console.log("Calendar endDate: ", endDate);
            // console.log("Calendar periodTodos: ", periodTodos);
            setDateTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const [message, setMessage] = useState<Message | null>({
        type: ToastTypes.NORMAL,
        reward: null,
        inventoryCount: 0
    });

    const [isActiveToast, setIsActiveToast] = useState<boolean>(false);

    //투두 체크시 상태 변경(unchecked->completed, completed->reverted, reverted->completed)
    async function updateStatus(
        contentId: string,
        content: string,
        checkStatus: string
    ) {
        try {
            const response: res<todo> = await axiosRequest.requestAxios<
                res<todo>
            >("patch", `/todoContents/${contentId}`, {
                contentId: contentId,
                todo: content,
                status: checkStatus
            });
            console.log("체크!", response.data.message);
            setIsActiveToast(true);
            setTimeout(() => {
                setIsActiveToast(false);
            }, 5500);
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
        }
    }

    const contextValue: TodoContextProps = {
        getTodos,
        periodTodos,
        dateTodos,
        updateDate,
        updateSelectedDate,
        selectedDate,
        updateStatus,
        message,
        isActiveToast
    };

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
}

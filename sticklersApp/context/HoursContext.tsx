import { createContext, useContext, useMemo, useState } from "react";

type HoursContextType = {
    hours: Hours;
    setHours: React.Dispatch<React.SetStateAction<Hours>>;
    scheduledTime: Date | null;
    setScheduledTime: React.Dispatch<React.SetStateAction<Date | null>>
    scheduledDate: Date | null;
    setScheduledDate: React.Dispatch<React.SetStateAction<Date | null>>
}

export type Hours = {
    open: number | null;
    close: number | null;
}

const HoursContext = createContext<HoursContextType | undefined>(undefined);

export const HoursProvider = ({ children }: any) => {
    const [hours, setHours] = useState<Hours>({
        open: null,
        close: null
    });
    const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
    const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

    const value = useMemo(
        () => ({
            hours,
            setHours,
            scheduledTime,
            setScheduledTime, 
            scheduledDate,
            setScheduledDate
        }),
        [hours, scheduledTime, scheduledDate]
    )

    return (
        <HoursContext.Provider value={value}>
            {children}
        </HoursContext.Provider>
    );
};

export const useHours = () => {
    const ctx = useContext(HoursContext);
    if (!ctx) throw new Error("useHours must be used inside provider");
    return ctx;
};
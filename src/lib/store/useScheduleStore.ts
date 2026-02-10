import { create } from 'zustand';
import { addDays, addWeeks, setHours, setMinutes, startOfWeek, subWeeks } from 'date-fns';

export type EventType = 'LECTURE' | 'LAB' | 'EXAM' | 'DEADLINE';

export interface CalendarEvent {
    id: string;
    title: string;
    type: EventType;
    start: Date;
    end: Date;
    location: string;
    professor: string;
    description?: string;
    isOnline: boolean;
}

interface ScheduleState {
    events: CalendarEvent[];
    currentDate: Date;
    viewMode: 'day' | 'week' | 'month';
    selectedEvent: CalendarEvent | null;
    setViewMode: (mode: 'day' | 'week' | 'month') => void;
    setCurrentDate: (date: Date) => void;
    setSelectedEvent: (event: CalendarEvent | null) => void;
}

// Helper to create event easily
const createEventRaw = (baseDate: Date, dayOffset: number, startH: number, startM: number, endH: number, endM: number, title: string, type: EventType, location: string, professor: string): CalendarEvent => ({
    id: Math.random().toString(36).substr(2, 9),
    title,
    type,
    start: setMinutes(setHours(addDays(baseDate, dayOffset), startH), startM),
    end: setMinutes(setHours(addDays(baseDate, dayOffset), endH), endM),
    location,
    professor,
    isOnline: false,
});

const generateSemesterEvents = (): CalendarEvent[] => {
    const today = new Date();
    // Generate for a "Semester" window: 4 weeks back, 12 weeks forward
    const startOfSemester = subWeeks(startOfWeek(today, { weekStartsOn: 1 }), 4);
    const totalWeeks = 16;

    let allEvents: CalendarEvent[] = [];

    for (let w = 0; w < totalWeeks; w++) {
        const weekBase = addWeeks(startOfSemester, w);

        const weekEvents = [
            // --- MONDAY (Offset 0) ---
            createEventRaw(weekBase, 0, 9, 0, 9, 50, 'Mathematics-2', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 0, 10, 0, 11, 25, 'Web App & Dev 1', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 0, 11, 30, 12, 15, 'DSA', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 0, 12, 20, 13, 0, 'Comp Fundamentals & Networking', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 0, 14, 30, 18, 0, 'RUFP', 'LAB', 'Research Center', 'Guide'),

            // --- TUESDAY (Offset 1) ---
            createEventRaw(weekBase, 1, 9, 0, 9, 50, 'Mathematics-2', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 1, 10, 0, 11, 25, 'Foundation of Data Science', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 1, 11, 30, 12, 15, 'DSA', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 1, 12, 20, 13, 0, 'Comp Fundamentals & Networking', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 1, 14, 30, 18, 0, 'RUFP', 'LAB', 'Research Center', 'Guide'),

            // --- WEDNESDAY (Offset 2) ---
            createEventRaw(weekBase, 2, 9, 0, 10, 25, 'Mathematics-2', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 2, 10, 30, 11, 55, 'Foundation of Data Science', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 2, 12, 0, 12, 50, 'DSA', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 2, 14, 30, 18, 0, 'RUFP', 'LAB', 'Research Center', 'Guide'),

            // --- THURSDAY (Offset 3) ---
            createEventRaw(weekBase, 3, 9, 0, 9, 50, 'Mathematics-2', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 3, 10, 0, 11, 0, 'Foundation of Data Science', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 3, 11, 5, 13, 0, 'Web App & Dev 1', 'LECTURE', 'C104', 'Faculty'),
            createEventRaw(weekBase, 3, 14, 30, 15, 20, 'Web App & Dev 1', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 3, 15, 30, 16, 20, 'Comp Fundamentals & Networking', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 3, 16, 30, 17, 20, 'Assignment (FOD/Math/WebDev)', 'LAB', 'A411', 'Faculty'),

            // --- FRIDAY (Offset 4) ---
            createEventRaw(weekBase, 4, 9, 0, 9, 50, 'Math-2 Doubt/Test', 'EXAM', 'A411', 'Faculty'),
            createEventRaw(weekBase, 4, 10, 0, 11, 25, 'Web App & Dev 1', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 4, 11, 30, 13, 0, 'DSA', 'LECTURE', 'A411', 'Faculty'),
            createEventRaw(weekBase, 4, 14, 30, 15, 20, 'Web App & Dev 1', 'LECTURE', 'A508', 'Faculty'),
            createEventRaw(weekBase, 4, 15, 30, 16, 20, 'FOD Test', 'EXAM', 'A508/A509', 'Faculty'),

            // --- SATURDAY (Offset 5) ---
            createEventRaw(weekBase, 5, 9, 0, 12, 50, 'Self & Society 2', 'LECTURE', 'Auditorium', 'Guest Lecturer'),
        ];

        allEvents = [...allEvents, ...weekEvents];
    }

    return allEvents;
};

export const useScheduleStore = create<ScheduleState>((set) => ({
    events: generateSemesterEvents(),
    currentDate: new Date(),
    viewMode: 'week',
    selectedEvent: null,
    setViewMode: (mode) => set({ viewMode: mode }),
    setCurrentDate: (date) => set({ currentDate: date }),
    setSelectedEvent: (event) => set({ selectedEvent: event }),
}));

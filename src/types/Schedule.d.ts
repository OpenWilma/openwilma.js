import type { Accounts } from "./Accounts";
import type { Room } from "./Room";

interface Schedule {
    schedule: Schedule.ScheduleEvent[];
    terms: Schedule.Term[];
}

export namespace Schedule {
    interface ScheduleEvent {
        id: number;
        date: {
            start: Date;
            end: Date;
            length: number;
        };
        shortName: string;
        name: string;
        color: string;
        gridPosition: {
            x: number;
            y: number;
        };
        details: {
            info: string;
            notes: string[]; // TODO: Needs more research
            teachers: Accounts.Teacher[];
            // book: []; // TODO: Needs more research
            rooms: Room[];
            vvt: string;
            editor: any;
            creator: any;
            visible: boolean;
        };
    }

    interface Term {
        name: string;
        startDate: Date;
        endDate: Date;
    }
}

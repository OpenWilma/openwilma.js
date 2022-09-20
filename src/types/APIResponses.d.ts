export namespace APIResponses {
    export interface WilmaList {
        wilmat: {
            url: string;
            name: string;
            formerUrl?: string;
            municipalities: {
                name_fi: string;
                name_sv: string;
            }[];
        }[];
    }

    export interface LoginFailed {
        LoginResult: "Failed";
        SessionID: string;
        ApiVersion: number;
    }

    export enum RoleType {
        teacher = "teacher",
        student = "student",
        personnel = "personnel",
        guardian = "guardian",
        workplaceinstructor = "workplaceinstructor",
        board = "board",
        passwd = "passwd",
        trainingcoordinator = "trainingcoordinator",
        training = "training",
        applicant = "applicant",
        applicantguardian = "applicantguardian",
    }

    export interface AccountRole {
        name: string;
        type: string;
        primusId: number;
        formKey: string;
        slug: string;
        schools: {
            id: number;
            caption: string;
            features: string[];
        }[];
    }

    export interface AccountInfo {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        lastLogin: string;
        sessions: [];
        multiFactorAuthentication: boolean;
    }

    type WeekDay = "Maanantai" | "Tiistai" | "Keskiviikko" | "Torstai" | "Perjantai" | "Lauantai" | "Sunnuntai";
    type lineNumber = string;
    type HexColorWithoutTag = string;

    interface Teacher {
        kortti: number;
        tunniste: string;
        lyhenne: string;
        nimi: string;
        sallittu: number;
    }

    interface Room {
        kortti: string;
        lyhenne: string;
        nimi: string;
    }

    interface ScheduleEvent {
        Id: string;
        ViikonPaiva: WeekDay;
        SijId: string;
        Tyyppi: string; // Can be documented
        Date: string; // <day>.<month>.<year>
        Start: number; // minutes
        End: number; // *
        Text: { [key: lineNumber]: string };
        LongText: { [key: lineNumber]: string };
        MinuuttiSij: string;
        X1: number;
        X2: number;
        Y1: number;
        Y2: number;
        ShowClasses: number;
        Lk: string;
        Color: HexColorWithoutTag;
        AllowOverlap: number;
        Lisatieto: { [key: lineNumber]: string };
        Muistiinpanot: { [key: lineNumber]: string };
        OppCount: { [key: lineNumber]: string };
        ArvKirjaNro: { [key: lineNumber]: string };
        Opet: { [key: lineNumber]: string };
        OpeInfo: { [key: lineNumber]: { [key: lineNumber]: Teacher } };
        Henkilot: { [key: lineNumber]: string };
        HenkiloInfo: any; // Unknown
        Huoneet: { [key: lineNumber]: { [key: lineNumber]: Room } }; // Unknown
        HuoneInfo: any; // Unknown
        MuutRes: any; // Unknown
        MuutResInfo: any; // Unknown
        Vvt: string;
        MuunGrid: string;
        MuunJakso: string;
        KouluId: string;
        JJarjId: string;
        GridId: string;
        ToisenKoulun: string;
        Lisaaja: {
            KurreID: string;
            Nimi: string;
        };
        Muokkaaja: {
            KurreID: string;
            Nimi: string;
        };
        Lukittu: string;
        NotInGrid: number;
    }

    interface ScheduleResponse {
        ViewOnly: boolean;
        DayCount: number;
        DayStarts: number;
        DayEnds: number;
        ActiveTyyppi: string;
        ActiveId: string;
        DialogEnabled: boolean;
        Events: ScheduleEvent[];
    }

    interface Term {
        Name: string;
        StartDate: string;
        EndDate: string;
    }

    interface Terms {
        Schedule: [];
        Terms: Term[];
    }
}

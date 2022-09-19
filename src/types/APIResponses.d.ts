export namespace APIResponses {
    interface WilmaList {
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

    interface LoginFailed {
        LoginResult: "Failed";
        SessionID: string;
        ApiVersion: number;
    }

    enum RoleType {
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

    interface AccountRole {
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

    interface AccountInfo {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        lastLogin: string;
        sessions: [];
        multiFactorAuthentication: boolean;
    }
}

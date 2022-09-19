import type { APIResponses } from "./APIResponses";

export interface Session {
    account: {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        lastLogin: Date | null;
    };
    roles: Session.Role[];
    session: {
        id: string;
        url: string;
        slug: string;
    };
    flags: string[];
}

export namespace Session {
    interface Role {
        name: string;
        type: APIResponses.RoleType;
        id: number;
        isDefault: boolean;
        slug: string;
    }

    interface Options {
        url: string;
        username: string;
        password: string;
        validateServer?: boolean;
        flags?: [];
    }
}

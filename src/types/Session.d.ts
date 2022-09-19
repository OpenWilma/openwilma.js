import type { APIResponses } from "./APIResponses";

export interface Session {
    account: Session.Account;
    roles: Session.Role[];
    session: Session.Info;
    flags: string[];
}

export namespace Session {
    interface Account {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        lastLogin: Date | null;
    }

    interface Info {
        id: string;
        url: string;
        slug: string;
    }

    interface Role {
        name: string;
        type: APIResponses.RoleType;
        id: number;
        isDefault: boolean;
        slug: string;
    }

    type Flags = string[];

    interface Options {
        url: string;
        username: string;
        password: string;
        validateServer?: boolean;
        flags?: Flags;
    }

    type RoleLike = Role | string | number;
}

import type { APIResponses } from "../types/APIResponses";

export namespace Session {
    export interface Data {
        account: Account;
        roles: Role[];
        session: Info;
        flags: string[];
    }

    export interface Account {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        lastLogin: Date | null;
    }

    export interface Info {
        id: string;
        url: string;
        slug: string;
    }

    export interface Role {
        name: string;
        type: APIResponses.RoleType;
        id: number;
        isDefault: boolean;
        slug: string;
    }

    export type Flags = string[];

    export interface Options {
        username: string;
        password: string;
        flags?: Flags;
    }

    export type RoleLike = Role | string | number;
}

export class Session implements Session.Data {
    public account!: Session.Account;
    public roles!: Session.Role[];
    public session!: Session.Info;
    public flags!: Session.Flags;

    public constructor(init?: Session.Data) {
        if (init) Object.assign(this, init);
    }

    // TODO: implement automatic reconnect on session expiry
    // TODO: implement the rest of the API

    /**
     * Perform an action as a specific role
     * @param role Some unique role identifier
     */
    public as(role: Session.RoleLike): Session {
        if (this.roles.length === 1 && this.roles[0].slug === "") throw new Error("Session does not support role control");

        // Get the role to select
        const roleToSelect: Session.Role = this.roles?.filter((availableRole: Session.Role) =>
            typeof role === "string" || typeof role === "number"
                ? availableRole.id === role || availableRole.slug === role
                : availableRole.id === role.id
        )[0];

        if (!roleToSelect) throw new Error("Unknown role");

        // Return clone of current Session with new role configured
        return new Session({
            account: {
                firstname: roleToSelect.name.trim().split(" ")[0],
                lastname: roleToSelect.name.trim().split(" ")[1],
                id: roleToSelect.id,
                username: this.account?.username,
                lastLogin: null,
            },
            session: {
                id: this.session.id,
                slug: roleToSelect.slug,
                url: this.session.url,
            },
            roles: this.roles,
            flags: this.flags,
        });
    }

    /**
     * Set the default role of the session
     * @param role Some unique role identifier
     */
    public setRole(role: Session.RoleLike): void {
        if (this.roles.length === 1 && this.roles[0].slug === "") throw new Error("Session does not support role control");

        // Get the role to select
        const roleToSelect: Session.Role = this.roles?.filter((availableRole: Session.Role) =>
            typeof role === "string" || typeof role === "number"
                ? availableRole.id === role || availableRole.slug === role
                : availableRole.id === role.id
        )[0];

        if (!roleToSelect) throw new Error("Unknown role");

        // Set role info
        this.account = {
            firstname: roleToSelect.name.trim().split(" ")[0],
            lastname: roleToSelect.name.trim().split(" ")[1],
            id: roleToSelect.id,
            username: this.account?.username,
            lastLogin: null,
        };

        this.session.slug = roleToSelect.slug;
    }
}

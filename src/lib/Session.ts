import fetch from "cross-fetch";
import type { APIResponses } from "../types/APIResponses";
import type { Schedule } from "../types/Schedule";
import repair from "../util/jsonRepair";

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

    // Schedules

    public async getSchedule(date: Date): Promise<Schedule> {
        // Format date parameter
        if (!(date instanceof Date)) throw new Error("Invalid date");

        const dateParameter = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        // Fetch the schedule
        const scheduleRequest = await fetch(`${this.session.url}${this.session.slug}/schedule?date=${dateParameter}`, {
            method: "GET",
            headers: {
                Cookie: `Wilma2SID=${this.session.id}`,
            },
        });

        if (scheduleRequest.status === 403) throw new Error("Unauthorized");
        if (scheduleRequest.status !== 200) throw new Error("Unable to fetch schedule");

        // Parse the schedule
        let scheduleJson: APIResponses.ScheduleResponse;

        try {
            scheduleJson = JSON.parse(repair((await scheduleRequest.text()).split("var eventsJSON = ")[1].split("\n")[0].trim()));
        } catch (_) {
            throw new Error("Failed to parse schedule data");
        }

        const schedule: Schedule.ScheduleEvent[] = scheduleJson.Events.map((event) => ({
            id: parseInt(event.Id, 10),
            date: {
                start: new Date(
                    Date.parse(`${event.Date.split(".")[1]}${event.Date.split(".")[0]}${event.Date.split(".")[2]}`) + (event.Start / 60) * 1000
                ),
                end: new Date(
                    Date.parse(`${event.Date.split(".")[1]}${event.Date.split(".")[0]}${event.Date.split(".")[2]}`) + (event.End / 60) * 1000
                ),
                length: event.End / 60 - event.Start / 60,
            },
            shortName: Object.keys(event.Text)
                .map((line) => event.Text[line])
                .join("\n"),
            name: Object.keys(event.LongText)
                .map((line) => event.LongText[line])
                .join("\n"),
            color: `#${event.Color}`,
            gridPosition: {
                x: event.X1 === 0 ? 0 : event.X1 * 0.0001,
                y: event.Y1 === 0 ? event.Y1 : event.Y1 + 1,
            },
            details: {
                info: Object.keys(event.Lisatieto)
                    .map((line) => event.Lisatieto[line].trim())
                    .join("\n"),
                students: parseInt(event.OppCount["0"].split(" ")[0], 10),
                notes: Object.keys(event.Muistiinpanot).map((line) => event.Muistiinpanot[line].trim()),
                teachers: Object.keys(event.OpeInfo)
                    .map((line1) =>
                        Object.keys(event.OpeInfo[line1]).map((line2) => ({
                            id: event.OpeInfo[line1][line2].kortti,
                            accountId: event.OpeInfo[line1][line2].tunniste,
                            callsign: event.OpeInfo[line1][line2].lyhenne,
                            name: event.OpeInfo[line1][line2].nimi,
                        }))
                    )
                    .flat(1),
                rooms: Object.keys(event.Huoneet)
                    .map((line1) =>
                        Object.keys(event.Huoneet[line1]).map((line2) => ({
                            id: event.Huoneet[line1][line2].kortti,
                            shortName: event.Huoneet[line1][line2].lyhenne,
                            name: event.Huoneet[line1][line2].nimi,
                        }))
                    )
                    .flat(1),
                vvt: event.Vvt,
                creator: event.Lisaaja.Nimi,
                editor: event.Muokkaaja.Nimi,
                visible: event.NotInGrid !== 0,
            },
        }));

        // Get terms
        const termsRequest = await fetch(`${this.session.url}${this.session.slug}/schedule/export/students/${this.account.id}/`, {
            method: "GET",
            headers: {
                Cookie: `Wilma2SID=${this.session.id}`,
            },
        });

        if (termsRequest.status === 403) throw new Error("Unauthorized");
        if (termsRequest.status !== 200) throw new Error("Unable to fetch periods");

        // Parse terms
        const termsData = (await termsRequest.json()) as APIResponses.Terms;
        const terms: Schedule.Term[] = termsData.Terms.map((term) => ({
            name: term.Name,
            startDate: new Date(Date.parse(term.StartDate)),
            endDate: new Date(Date.parse(term.EndDate)),
        }));

        return {
            schedule,
            terms,
        };
    }
}

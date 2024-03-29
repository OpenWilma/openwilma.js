import type { APIResponses } from "../types/APIResponses";
import type { Schedule } from "../types/Schedule";
import repair from "../util/jsonRepair";
import { fetch } from "./fetch";
import { login } from "./Login";

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

const passwords: { [key: string]: string } = {};

export class Session implements Session.Data {
    public account!: Session.Account;
    public roles!: Session.Role[];
    public session!: Session.Info;
    public flags!: Session.Flags;
    private options!: Session.Options;
    private passwordId!: string;

    public constructor(init?: Session.Data, options?: Session.Options) {
        if (init) Object.assign(this, init);
        if (options) {
            // TODO: Does this have any effect?
            // The idea of this whole mess is to prevent the password being accessed again directly from the session class
            // In theory; without reading the whole heap, the password cannot be accessed from a context which can access the session
            this.passwordId = new Array(10)
                .fill(0)
                .map(() => Math.floor(Math.random() * 10))
                .join("");

            passwords[this.passwordId] = options.password;
            options.password = this.passwordId;

            this.options = options;
        }
    }

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

    public async getSchedule(date: Date = new Date(), timezone = 3): Promise<Schedule> {
        await this.refresh(); // Refresh session if needed

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
                    Date.parse(`${event.Date.split(".")[1]}.${event.Date.split(".")[0]}.${event.Date.split(".")[2]}`) +
                        event.Start * 60 * 1000 +
                        timezone * 60 * 60 * 1000
                ),
                end: new Date(
                    Date.parse(`${event.Date.split(".")[1]}.${event.Date.split(".")[0]}.${event.Date.split(".")[2]}`) +
                        event.End * 60 * 1000 +
                        timezone * 60 * 60 * 1000
                ),
                length: (event.End / 60 - event.Start / 60) * 60,
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
                rooms: Object.keys(event.HuoneInfo)
                    .map((line1) =>
                        Object.keys(event.HuoneInfo[line1]).map((line2) => ({
                            id: event.HuoneInfo[line1][line2].kortti,
                            shortName: event.HuoneInfo[line1][line2].lyhenne,
                            name: event.HuoneInfo[line1][line2].nimi,
                        }))
                    )
                    .flat(1),
                vvt: event.Vvt,
                creator: event.Lisaaja.Nimi.split("  ")[1] ?? null,
                editor: event.Muokkaaja.Nimi.split("  ")[1] ?? null,
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

    private async refresh(): Promise<void> {
        const overviewRequest = await fetch(`${this.session.url}${this.session.slug}/overview`, {
            method: "GET",
            headers: {
                Cookie: `Wilma2SID=${this.session.id}`,
            },
        });

        if (overviewRequest.status !== 200) throw new Error("Received an unexpected status code while refreshing session state");

        const sessionState = (await overviewRequest.json()) as APIResponses.OverviewLoginResult;

        if (sessionState.LoginResult === false) {
            try {
                const options = Object.assign({}, this.options);

                options.password = passwords[this.passwordId];

                const newSession = await login(this.options, this.session.url);

                // TODO: Should refreshing the current login we supported?
                if (newSession.roles !== this.roles) throw new Error("Account role information changed since login");
            } catch (_) {
                throw new Error("Failed to refresh session");
            }
        }
    }
}

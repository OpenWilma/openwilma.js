// Placeholder

import {WilmaSession} from "../../types";
import {User} from "../../types/user";
import apiRequest from "../../net/apiRequest";
import Errors from "../../utils/error";
import {userMustSelectProfile} from "../../parser/profiles";

export default class ProfileManager {
    session: WilmaSession

    constructor(session: WilmaSession) {
        this.session = session
    }

    /**
     * Get main profile
     */
    async get() {
        try {
            const homepage = await apiRequest.get({
                session: this.session,
                endpoint: "/",
                ignoreSlug: true
            });

        } catch (e) {

        }
    }

    /**
     * Boolean to determine if profile must be selected
     */
    async profileSelectionRequired() {
        const homepage = await apiRequest.get({
            session: this.session,
            endpoint: "/",
            ignoreSlug: true
        });
        if (homepage.status == 200) {
            return userMustSelectProfile(homepage.data);
        } else {
            throw new Errors.WAPIServerError(homepage.data.error)
        }
    }
}
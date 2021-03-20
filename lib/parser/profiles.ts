import {Profile} from "../types/profile";
let cheerio = require('cheerio');

/**
 * Parse profiles from homepage
 * @param homepageHtml
 */
export function parseProfiles(homepageHtml: string): Profile[] {
    // TODO
    return [];
}

/**
 * Return boolean if user is required to select a profile in order to continue with rest of the API call requests
 * @param homepageHtml
 */
export function userMustSelectProfile(homepageHtml: string): boolean {
    // TODO
    let document = cheerio.load(homepageHtml);
    let roleSelectionItem = document("#role-selection");
    return roleSelectionItem != null;
}
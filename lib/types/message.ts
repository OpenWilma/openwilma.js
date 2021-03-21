import { WilmaProfile } from "./profiles"

/**
 * Wilma message entity location
 */
export type WilmaMessageLocation = "sent"|"archive"|"inbox"|"drafts"

/**
 * Wilma message entity
 */
export interface WilmaMessage {
    title: string,
    timestamp: Date,
    location: WilmaMessageLocation,
    author: WilmaProfile,
    id: string
}
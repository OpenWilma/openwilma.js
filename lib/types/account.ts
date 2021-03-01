/**
 * Wilma account role
 */
export type WilmaRole = "teacher"|"student"|"staff"|"parent"|"workplace-instructor"|"management"|"generic"

/**
 * Wilma account entity
 */
export interface WilmaAccount {
    name: string,
    role: WilmaRole,
    id: string,
    code: string|null,
    class: string|null,
    
}
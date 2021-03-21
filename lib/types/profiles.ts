/**
 * Wilma profile prefix types
 */
export type WilmaProfilePrefix = "teachers"|"personnel"|"students"|"inventory"|"rooms"

/**
 * Wilma profile role
 */
export type WilmaRole = "teacher"|"student"|"staff"|"guardian"|"workplace-instructor"|"management"|"generic"|"unknown"


/**
 * Wilma profile entity
 */
export interface WilmaProfile {
    name: string,
    role: WilmaRole,
    id: string,
    code?: string,
    class?: string,
    schoolIds?: number[]
}

// General
export interface TypesConversionKeys {
    [key: string]: WilmaRole;
}
export interface TypesConversion extends TypesConversionKeys {
    r_guardian: WilmaRole
}
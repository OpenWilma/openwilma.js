// Repairs broken JSON provided by Wilma
export default function repair(json: string): string {
    return (
        json
            // Replace ":" or ':' with "&tag&"" if it's between double-quotes
            .replace(/:\s*"([^"]*)"/g, (_, p1) => `: "${p1.replace(/:/g, "&tag&")}"`)
            .replace(/:\s*'([^']*)'/g, (_, p1) => `: "${p1.replace(/:/g, "&tag&")}"`)

            // Repair tag structure
            .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

            // Turn "&tag&" back into ":"
            .replace(/&tag&"/g, ":")

            // Remove semicolon at the end
            .replace(/;$/g, "")
    );
}

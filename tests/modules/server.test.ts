import { listServers, validateServer } from "../../src";

test("listServers returns list of Wilmas", async () => {
    const servers = await listServers();

    expect(Array.isArray(servers) && servers.length > 0).toBe(true);
});

describe("validateServer", () => {
    test("returns true for valid Wilma", async () => {
        const isValid = await validateServer("https://ouka.inschool.fi");

        expect(isValid).toBe(true);
    });

    test("returns false for invalid Wilma", async () => {
        const isValid = await validateServer("https://notawilma.example.com");

        expect(isValid).toBe(false);
    });
});

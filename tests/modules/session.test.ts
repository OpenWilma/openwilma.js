import { create } from "../../src";

test("create returns session", async () => {
    const session = await create({
        url: "https://espoondemo.inschool.fi",
        username: "oppilas",
        password: "oppilas",
        validateServer: false,
    });

    expect(session).toBeDefined();
});

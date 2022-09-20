import crossFetch from "cross-fetch";

export function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return crossFetch(input, {
        ...init,
        headers: {
            ...init?.headers,
            "User-Agent": "OpenWilma.js/[VI]{version}[/VI]",
        },
    });
}

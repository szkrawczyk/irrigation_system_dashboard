export async function onRequest(context) {

    const url = new URL(context.request.url);

    const workerURL =
        "https://irrigation-worker.szymon882.workers.dev";

    const target =
        workerURL + url.pathname + url.search;


    return fetch(target, {
        method: context.request.method,
        headers: context.request.headers,
        body:
            context.request.method !== "GET"
                ? await context.request.text()
                : undefined
    });

}
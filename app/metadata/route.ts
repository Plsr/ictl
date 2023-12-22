import urlMetadata from "url-metadata";

export async function POST(request: Request) {
  const requestBody = await request.json();

  if (!requestBody.urlCandidate) {
    return new Response(null, { status: 422 });
  }

  try {
    const res = await urlMetadata(requestBody.urlCandidate);
    return Response.json(res);
  } catch {
    return new Response(null, { status: 422 });
  }
}

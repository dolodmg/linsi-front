import { getSession } from '../../../lib/session';

export async function GET(req) {
  try {
    const session = await getSession();
    return new Response(JSON.stringify({ token: session?.token || null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    return new Response(
      JSON.stringify({ error: "Unable to retrieve session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(req) {
  try {
    const session = await getSession();
    session.destroy();

    return new Response(JSON.stringify({ message: "Logged out" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Logout failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

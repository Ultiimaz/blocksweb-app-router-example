import { IWorkspace } from "@blocksweb/core/editor";
import assert from "assert";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getWorkspace = async (): Promise<IWorkspace | undefined> => {
  assert(process.env.BLOCKSWEB_API_KEY, "BLOCKSWEB_API_KEY not set.");
  const token = process.env.BLOCKSWEB_API_KEY;
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  console.log(session?.value, token);

  if (!session || !session.value) {
    redirect("/admin/sign-in");
  }

  try {
    const workspaces: IWorkspace[] = await fetch(
      "https://api.blocksweb.nl/workspaces",
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${token}`,
          Authorization: `Bearer ${session.value}`,
        },
      }
    ).then((res) => res.json());

    console.log(workspaces);
    return workspaces.find((ws) => ws.apiKey === token);
  } catch (e) {
    console.log(e);
  }
};

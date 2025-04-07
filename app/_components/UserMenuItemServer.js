// app/_components/UserMenuItemServer.js
import { auth } from "../_lib/auth";
import UserMenuItem from "./UserMenuItem";

export default async function UserMenuItemServer() {
  const session = await auth();

  return <UserMenuItem session={session} />;
}

import UserForm from "@/components/user_form";
import { db } from "@/db";
import { getUsers } from "./actions/actions";

export default async function Test() {
  const users = await getUsers();

  return (
        <UserForm users={users}/>
    )
}

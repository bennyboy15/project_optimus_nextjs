import ViewUsers from "@/components/display_users";
import { createUser, getUsers } from "./actions/actions";

export default async function Test() {
  const users = await getUsers();
  return (
    <div>
        <form action={createUser} className="px-2 flex flex-col gap-2">
          <input type="text" name="name" placeholder="name" className="rounded px-2 border border-white"/>
          <input type="text" name="username" placeholder="username" className="rounded px-2 border border-white"/>
          <input type="password" name="password" placeholder="password" className="rounded px-2 border border-white"/>
          <input type="text" name="email" placeholder="email" className="rounded px-2 border border-white"/>
          <input type="text" name="phone" placeholder="phone" className="rounded px-2 border border-white"/>
          <input type="text" name="role" placeholder="role" className="rounded px-2 border border-white"/>
          <button type="submit" className="hover:cursor-pointer rounded bg-green-500 text-white px-2 py-1 font-semibold">SUBMIT</button>
        </form>
        <div className="mt-2 px-2">
          <ViewUsers users={users}/>
        </div>
      </div>
    )
}

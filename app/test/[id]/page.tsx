import { editUser, getUser } from "../actions/actions";

export default async function EditUser({ params }: { params: { id: string } }){
    const id: number = Number(params.id);
    const user = await getUser(id);
    return (
        <div>
            <form action={editUser} className="px-2 flex flex-col gap-2">
                <input type="hidden" name="id" value={id} />
                <input defaultValue={user.name} type="text" name="name" placeholder="name" className="rounded px-2 border border-white"/>
                <input defaultValue={user} type="text" name="username" placeholder="username" className="rounded px-2 border border-white"/>
                <input defaultValue={user} type="text" name="email" placeholder="email" className="rounded px-2 border border-white"/>
                <input defaultValue={user} type="text" name="phone" placeholder="phone" className="rounded px-2 border border-white"/>
                <input defaultValue={user} type="text" name="role" placeholder="role" className="rounded px-2 border border-white"/>
                <button type="submit" className="hover:cursor-pointer rounded bg-green-500 text-white px-2 py-1 font-semibold">SUBMIT</button>
            </form>
        </div>
    )
}
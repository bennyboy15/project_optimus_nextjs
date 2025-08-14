import { editCustomer, getCustomer } from "@/app/admin/actions/admin_actions";

type Customer = {
    name:string,
    email: string | null,
    phone: string | null,
    address: string | null
}

export default async function EditCustomer({ params }: { params: { id: string } }){
    const id: number = Number(params.id);
    const customer: Customer = (await getCustomer(id))[0];
    return (
        <div>
            <form action={editCustomer} className="px-2 flex flex-col gap-2">
                <input type="hidden" name="id" value={id} />
                <input defaultValue={customer.name} type="text" name="name" placeholder="name" className="rounded px-2 border border-white"/>
                <input defaultValue={customer.email ? customer.email : ""} type="text" name="email" placeholder="email" className="rounded px-2 border border-white"/>
                <input defaultValue={customer.phone ? customer.phone : ""} type="text" name="phone" placeholder="phone" className="rounded px-2 border border-white"/>
                <input defaultValue={customer.address ? customer.address : ""} type="text" name="address" placeholder="role" className="rounded px-2 border border-white"/>
                <button type="submit" className="hover:cursor-pointer rounded bg-green-500 text-white px-2 py-1 font-semibold">SUBMIT</button>
            </form>
        </div>
    )
}
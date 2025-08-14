import { getCustomer } from "@/app/admin/actions/admin_actions"

type Props = {
    createdOn: Date,
    customerId: number,
    status: number
}

export default async function Gallery({ createdOn, customerId, status} : Props) {
    const customer = (await getCustomer(customerId))[0];
    return (
        <div className="relative transform transition-transform duration-200 ease-out hover:scale-105">
            <div className={`absolute top-3 left-3 w-4 h-4 rounded-[8px] bg-amber-500 border-2 border-amber-700
                ${
                    status === 0 ? "bg-green-600 border-green-900" :
                    status === 1 ? "bg-blue-500 border-blue-900" :
                    status === 2 ? "bg-amber-600 border-amber-900" :
                    status === 3 ? "bg-purple-600 border-purple-900" :
                    "bg-gray-300 border-gray-600"
                }`}>
            </div>
            <div className="absolute top-3 right-3">
                <button className="flex items-center gap-2 bg-white border border-gray-400 text-gray-600 px-2 py-1 rounded-xl text-[12px] hover:cursor-pointer hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500">
                    View
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                    </svg>
                </button>
            </div>
            <article
                className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25"
            >
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    className="h-56 w-full object-cover"
                />

                <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
                    <time dateTime="2022-10-10" className="block text-xs text-gray-500 dark:text-gray-400">
                        {createdOn.toLocaleDateString()}
                    </time>

                    <a href="#">
                        <h3 className="mt-0.5 text-lg text-gray-900 dark:text-white">
                            {customer.name}
                        </h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                        pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
                        mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                    </p>
                </div>
            </article>
        </div>
    )
}
import { createCustomer } from "@/app/admin/actions/admin_actions"
import { SubmitButton } from "../ui/submit_button";

export default function CustomerForm() {

  return (
    <div className="flex flex-col gap-2 rounded bg-gray-200 dark:bg-gray-700/50 dark:border-gray-400 border-2 shadow text-gray-800 dark:text-gray-200 font-semibold">
      
      {/* Title */}
      <h1 className="font-semibold text-2xl p-2 border-b-2 dark:border-gray-400">New Customer +</h1>

      {/* Form */}
      <form
        action={createCustomer}
        className="flex flex-col gap-2 p-4 rounded text-gray-800 dark:text-gray-200 font-semibold">
        <div className="flex gap-4">
          <label htmlFor="name" className="min-w-20">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800"
            placeholder="Name..."
          />
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800"
            placeholder="Email..."
          />
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800"
            placeholder="Phone..."
          />
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800"
            placeholder="Address..."
          />
        </div>

        <SubmitButton title="Submit"/>
      </form>
    </div>
  );
}

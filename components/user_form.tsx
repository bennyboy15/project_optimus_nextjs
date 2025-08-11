import { createUser } from "@/app/test/actions/actions";

export default function UserForm() {

  return (
    <div className="flex flex-col gap-2 rounded bg-gray-200 dark:bg-gray-700/50 dark:border-gray-400 border-2 shadow text-gray-800 dark:text-gray-200 font-semibold">
      
      {/* Title */}
      <h1 className="font-semibold text-2xl p-2 border-b-2 dark:border-gray-400">New User +</h1>

      {/* Form */}
      <form
        action={createUser}
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
          <label className="min-w-20" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800"
            placeholder="Username..."
          />
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800"
            placeholder="Password..."
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
          <label className="min-w-20" htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800"
            placeholder="Role..."
          />
        </div>

        <button
          type="submit"
          className="rounded w-full px-2 py-1 text-white bg-green-500 font-semibold disabled:opacity-50"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

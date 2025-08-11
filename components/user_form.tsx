"use client";

import { createUser, deleteUser, editUser } from "@/app/test/actions/actions";
import { useTransition } from "react";

type OptimusUsers = {
  id: number;
  name: string;
  username: string;
  email: string | null;
  phone: string | null;
  role: string;
};

export default function UserForm({ users }: { users: OptimusUsers[] }) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      await createUser(formData);
    });
  }

  return (
    <div className="p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 p-4 rounded bg-gray-200 border shadow text-gray-800 font-semibold"
      >
        <div className="flex gap-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="px-2 rounded border border-gray-200 shadow bg-white"
            placeholder="Name..."
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="px-2 rounded border border-gray-200 shadow bg-white"
            placeholder="Username..."
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="px-2 rounded border border-gray-200 shadow bg-white"
            placeholder="Password..."
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="px-2 rounded border border-gray-200 shadow bg-white"
            placeholder="Email..."
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            className="px-2 rounded border border-gray-200 shadow bg-white"
            placeholder="Phone..."
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            className="px-2 rounded border border-gray-200 shadow bg-white"
            placeholder="Role..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded px-2 py-1 text-white bg-green-500 font-semibold disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "SUBMIT"}
        </button>
      </form>

      {isPending && (
        <div className="absolute inset-0 bg-gray-800/50 mt-4 text-blue-600 font-semibold">
          {/* Your spinner or loading text */}
          Loading...
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Users:</h2>
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div key={user.id} className="flex justify-between items-center bg-white text-gray-800 p-4 font-semibold rounded shadow border border-gray-500">
              <div>
                ({user.id}) <input type="text" value={user.name} name="name"/><input type="text" value={user.role} name="role"/>
              </div>

              <div>
                <button
                  //onClick={() => editUser(user.id)}
                  className="ml-2 px-2 py-1 text-white bg-orange-500 rounded hover:cursor-pointer">
                  EDIT
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="ml-2 px-2 py-1 text-white bg-red-500 rounded hover:cursor-pointer">
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

"use client";

import { deleteUser } from "@/app/test/actions/actions";
import router, { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  role: string;
};

export default function ViewUsers({ users }: { users: User[] }) {
  const router = useRouter();
  const handleEdit = (userID: number) => {
    router.push(`/test/${userID}`);
  };
  
  return (
    <div className="rounded border-2 dark:border-gray-400 dark:bg-gray-700/50">
      {/* Title */}
      <h1 className="font-semibold text-2xl p-2 border-b-2 dark:border-gray-400">
        User List
      </h1>

      {/* User List */}
      <div>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 hover:bg-gray-600/50"
          >
            <div className="flex items-center gap-2">
              <button
                className={`rounded px-2 py-1 border-2 font-semibold min-w-15 ${
                  user.role === "IT"
                    ? "bg-blue-300 border-blue-900 text-blue-900"
                    : user.role === "Sales"
                    ? "bg-green-400 border-green-900 text-green-900"
                    : user.role === "PD"
                    ? "bg-purple-300 border-purple-900 text-purple-900"
                    : "bg-gray-300 border-gray-600 text-gray-800"
                }`}
              >
                {user.role}
              </button>
              <p>{user.id} {user.name}</p>
            </div>

            <div className="inline-flex gap-0.5">
              <button className="rounded-l-sm border border-gray-200 hover:border-blue-500 hover:border-2 px-3 py-2 text-gray-700 transition-colors hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white">
                {/* View */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>

              <button onClick={() => handleEdit(user.id)} className="-ml-px border border-gray-200 hover:border-orange-500 px-3 py-2 hover:border-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white">
                {/* Edit */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>

              <form
                action={async () => {
                  await deleteUser(user.id);
                }}
              >
                <button
                  type="submit"
                  className="-ml-px rounded-r-sm border border-gray-200 hover:border-red-500 hover:border-2 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  {/* Delete */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

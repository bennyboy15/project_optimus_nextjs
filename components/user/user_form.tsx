import { createUser } from "@/app/admin/actions/admin_actions";
import { SubmitButton } from "../ui/submit_button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
          <Input name="name" required placeholder="Name..."/>
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="username">Username</label>
          <Input name="username" required placeholder="Username..."/>
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="password">Password</label>
          <Input name="password" type="password" required placeholder="Password..."/>
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="email">Email</label>
          <Input name="email" required placeholder="Email..."/>
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="phone">Phone</label>
          <Input name="phone" required placeholder="Phone..."/>
        </div>

        <div className="flex gap-4">
          <label className="min-w-20" htmlFor="role">Role</label>
          <Select name="role" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="PD">PD</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>

        <SubmitButton title="Submit"/>
      </form>
    </div>
  );
}

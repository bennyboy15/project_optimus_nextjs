import { createWorksheet } from "../actions/worksheet_actions";

export default function NewWorksheetForm() {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow p-6 dark:text-gray-800">
      <h1 className="text-xl font-bold mb-4">Create Worksheet</h1>
      <form action={createWorksheet} className="flex flex-col gap-4">
        {/* Truck ID */}
        <div>
          <label className="block mb-1 text-sm font-medium">Truck ID</label>
          <input
            type="number"
            name="truckId"
            placeholder="Truck ID"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Salesman ID */}
        <div>
          <label className="block mb-1 text-sm font-medium">Salesman ID</label>
          <input
            type="number"
            name="salesmanId"
            placeholder="Salesman ID"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Customer ID */}
        <div>
          <label className="block mb-1 text-sm font-medium">Customer ID</label>
          <input
            type="number"
            name="customerId"
            placeholder="Customer ID"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 text-sm font-medium">Status</label>
          <select
            name="status"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select status</option>
            <option value="0">Pending</option>
            <option value="1">In Progress</option>
            <option value="2">Completed</option>
          </select>
        </div>

        {/* Created By */}
        <div>
          <label className="block mb-1 text-sm font-medium">Created By</label>
          <input
            type="number"
            name="createdBy"
            placeholder="User ID"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-4 py-2"
        >
          Create Worksheet
        </button>
      </form>
    </div>
  );
}

import { createTruck, getCustomers, getMakes, getModels, getSalesmen } from "@/app/admin/actions/admin_actions"
import { SubmitButton } from "../ui/submit_button"

export default async function TruckForm() {
  const customers = await getCustomers()
  const salesmen = await getSalesmen()
  const makes = await getMakes()
  const models = await getModels()
  return (
    <div className="flex flex-col gap-2 rounded bg-gray-200 dark:bg-gray-700/50 dark:border-gray-400 border-2 shadow text-gray-800 dark:text-gray-200 font-semibold">
      
      {/* Title */}
      <h1 className="font-semibold text-2xl p-2 border-b-2 dark:border-gray-400">New Truck +</h1>

      {/* Form */}
      <form
        action={createTruck}
        className="flex flex-col gap-2 p-4 rounded text-gray-800 dark:text-gray-200 font-semibold">
        
        <div className="flex gap-4">
          <label htmlFor="customerId" className="min-w-20">Customer</label>
          <select name="customerId" className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800">
            {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <label htmlFor="salesmanId" className="min-w-20">Salesman</label>
          <select name="salesmanId" className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800">
            {salesmen.map(salesman => (
                <option key={salesman.id} value={salesman.id}>{salesman.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <label htmlFor="makeId" className="min-w-20">Make</label>
          <select name="makeId" className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800">
            {makes.map(make => (
                <option key={make.id} value={make.id}>{make.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <label htmlFor="modelId" className="min-w-20">Model</label>
          <select name="modelId" className="w-full px-2 rounded border border-gray-200 shadow bg-white dark:text-gray-800">
            {models.map(model => (
                <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>

        <SubmitButton title="Submit"/>
      </form>
    </div>
  );
}

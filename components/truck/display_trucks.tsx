"use client";

import { deleteTruck } from "@/app/admin/actions/admin_actions";
import { useRouter } from "next/navigation";

export type Truck = {
  id: number;
  customerId: number | null;
  salesmanId: number | null;
  makeId: number | null;
  modelId: number | null;

  fleetNo?: string | null;
  stockNo?: string | null;
  chassisNo?: string | null;
  registration?: string | null;

  offlineDate?: Date | null;
  deliveryDate?: Date | null;

  truckColour?: string | null;
  chassisColour?: string | null;
  trimColour?: string | null;

  status?: number | null;

  A4_stickers_done?: boolean | null;
  small_stickers_done?: boolean | null;
};

export type Customer = {
  id: number;
  name: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
};

export default function ViewTrucks({
  trucks,
  customers,
}: {
  trucks: Truck[];
  customers: Customer[];
}) {
  const router = useRouter();

  const handleEdit = (truckID: number) => {
    router.push(`/admin/truck/${truckID}`);
  };

  // Helper to get a customer's name safely
  const getCustomerName = (id: number | null) =>
    customers.find((c) => c.id === id)?.name ?? "Unknown";

  return (
    <div className="rounded border-2 dark:border-gray-400 dark:bg-gray-700/50">
      <h1 className="font-semibold text-2xl p-2 border-b-2 dark:border-gray-400">
        Truck List
      </h1>

      <div>
        {trucks.map((truck) => (
          <div
            key={truck.id}
            className="flex items-center justify-between p-2 hover:bg-gray-600/50"
          >
            <div className="flex items-center gap-2">
              <button className="rounded px-2 py-1 border-2 font-semibold min-w-15 bg-gray-300 border-gray-600 text-gray-800">
                {truck.id}
              </button>
              <p>
                {truck.id} {getCustomerName(truck.customerId)}
              </p>
            </div>

            <div className="inline-flex gap-0.5">
              <button
                onClick={() => handleEdit(truck.id)}
                className="-ml-px border border-gray-200 hover:border-orange-500 px-3 py-2 hover:border-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                Edit
              </button>

              <form action={async () => {await deleteTruck(truck.id);}}>
                <button
                  type="submit"
                  className="-ml-px rounded-r-sm border border-gray-200 hover:border-red-500 hover:border-2 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

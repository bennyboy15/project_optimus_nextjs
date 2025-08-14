import Gallery from "@/components/gallery";
import SearchBanner from "@/components/search_banner";
import { db } from "@/db";

export default async function Worksheets() {
  const worksheets = await db.query.worksheets.findMany();

  return (
    <div className="flex flex-col px-4 gap-4">
      <SearchBanner
        title="Worksheet List"
        placeholder="Enter customer name, stock # or chassis #..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {worksheets.map((worksheet) => (
          <Gallery
            key={worksheet.id}
            createdOn={worksheet.createdOn}
            customerId={worksheet.customer_id}
            status={worksheet.status ?? -1}
          />
        ))}
      </div>
    </div>
  );
}

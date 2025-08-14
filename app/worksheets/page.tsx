import Gallery from "@/components/gallery";
import SearchBanner from "@/components/search_banner";
import { db } from "@/db";

export default async function Worksheets(){
    const worksheets = await db.query.worksheets.findMany();
    return (
        <div className="flex flex-col px-4 gap-4">
            <SearchBanner title="Worksheet List" placeholder="Enter customer name, stock # or chassis #..."/>
            {worksheets.map(worksheet => (
                <Gallery createdOn={worksheet.createdOn} customerId={worksheet.customer_id}/>
            ))}
        </div>
    )
}
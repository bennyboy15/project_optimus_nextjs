import Gallery from "@/components/gallery";
import SearchBanner from "@/components/search_banner";

export default function Worksheets(){
    return (
        <div className="flex flex-col px-4 gap-2">
            <SearchBanner title="Worksheet List" placeholder="Enter customer name, stock # or chassis #..."/>
            <Gallery/>
        </div>
    )
}

import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {
    await connectDB();

    // Fetch the property that matches the values from the form.

    const locationPattern = new RegExp(location, 'i');

    // Match the search terms.
    let query = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            {'location.street': locationPattern},
            {'location.city': locationPattern},
            {'location.state': locationPattern},
            {'location.zipcode': locationPattern},
        ]
    }

    // Property Type is a dropdown field
    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query.tytpe = typePattern;
    }

    // Perform the actual query.
    const propertiesQueryResults = await Property.find(query).lean();
    const properties = convertToSerializableObject(propertiesQueryResults);

    return ( 
        <>
            {/* Search Form */}
            <section className="bg-blue-700 py-4">
                <div className="max-w 7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            {/* Search Form Ends here */}
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto py04 py-6">
                    <Link href='/properties' className="flex items-center text-blue-500 hover:inderline mb-3">
                       <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
                    </Link>
                    <h1 className="text-2xl mb-4">Search Results</h1>
                    {properties.length === 0 ? (<p>No search results found</p>) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <PropertyCard key={property._id} property={property}/>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        
        
        </>
        
     );
}
 
export default SearchResultsPage;
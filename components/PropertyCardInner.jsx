import PropertyCard from './PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertyCardInner = async () => {
    await connectDB();
    const properties = await Property.find({}).lean();
    
    return ( 
        <>
        {/* Check if there are properties listed  */}
            {properties.length === 0 ? (<p>No properties found</p>) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {
                        // Map through each property.
                        properties.map( (property) => (
                            <PropertyCard key={ property._id } property={property} />
                        ))
                    }
                </div>
            ) }
        </>
     );
}
 
export default PropertyCardInner;
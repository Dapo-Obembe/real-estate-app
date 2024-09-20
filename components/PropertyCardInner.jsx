import properties from '@/properties.json';
import PropertyCard from './PropertyCard';

const PropertyCardInner = () => {
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
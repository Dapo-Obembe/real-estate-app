import PropertyCard from './PropertyCard';
import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const HomeProperties = async () => {
    await connectDB();

    // Fetch latest 3 properties.
    const recentProperties = await Property.find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();
    
    return (
        <>
        <section className='px-4 py-6'>
            <div className="container-xl lg:container m-auto px-4 py-6">
                <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                    Recent Properties
                </h2>
                {/* Check if there are properties listed  */}
                {recentProperties.length === 0 ? (<p>No properties found</p>) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {
                            // Map through each property.
                            recentProperties.map( (property) => (
                                <PropertyCard key={ property._id } property={property} />
                            ))
                        }
                    </div>
                ) }
            </div>
            </section>
            {recentProperties.length === 3 ? (
                <section className="m-auto max-w-lg my-10 px-6">
                    <Link href='/properties' className='block bg-black text-white text-center py-4 px-6 my-6 rounded-xl hover:bg-gray-700'>View All Properties</Link>
                </section>
            ) : ''}
            
        </>
     );
}
 
export default HomeProperties;
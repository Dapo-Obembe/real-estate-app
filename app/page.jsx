import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/database";

const HomePage = () => {
    connectDB();
    return (
        <div>
            <Hero />
            <InfoBoxes />
            <HomeProperties />
        </div>
    );
}
 
export default HomePage;
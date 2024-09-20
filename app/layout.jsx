import './global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Real Estate App',
    keywords: 'rental, property, real estate, buy house',
    description: 'Find a perfect rental property in Nigeria',
}
const MainLayout = ({ children }) => {
    return (<html lang="en">
        <body>
            <Navbar/>
            <main>
                {children}
            </main>
            <Footer/>
        </body>
    </html> );
}
 
export default MainLayout;
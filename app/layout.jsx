import './global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: 'Real Estate App',
    keywords: 'rental, property, real estate, buy house',
    description: 'Find a perfect rental property in Nigeria',
}
const MainLayout = ({ children }) => {
    return (
        <AuthProvider>

        <html lang="en">
            <body>
                <Navbar/>
                <main>
                    {children}
                </main>
                <Footer />
                <ToastContainer/>
            </body>
        </html>
        </AuthProvider>
        );
}
 
export default MainLayout;
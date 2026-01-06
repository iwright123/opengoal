import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar'; // Keep Navbar for Mobile only
import { ThemeProvider } from '@/components/ThemeContext';

export const metadata = {
    title: 'OpenGoal',
    description: 'Open source football match information',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <div className="layout">
                        <Sidebar />
                        <div className="main-content">
                            {/* Show Navbar only on mobile via CSS media query if needed */}
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}

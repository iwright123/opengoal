import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar'; // Keep Navbar for Mobile only

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
                <div className="layout">
                    <Sidebar />
                    <div className="main-content">
                        {/* Show Navbar only on mobile via CSS media query if needed, or refine layout strategy later. 
                 For now Sidebar is hidden on mobile, so we might need a mobile header.
                 Let's stick to the simplest approach: grid with sidebar.
             */}
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}

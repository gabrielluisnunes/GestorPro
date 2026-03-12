import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  userName?: string;
}

export function PageLayout({ children, pageTitle, userName }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={userName} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar pageTitle={pageTitle} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

import DashboardClient from './DashboardClient';

// This page no longer fetches data. It only displays the client component.
export default function DashboardPage() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8">Admin Dashboard</h1>
      <DashboardClient />
    </>
  );
}

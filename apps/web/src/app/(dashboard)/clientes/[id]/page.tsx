import ClientProfilePage from "@/features/clients/client-profile-page";

export default function Page({ params }: { params: { id: string } }) {
  return <ClientProfilePage id={params.id} />;
}

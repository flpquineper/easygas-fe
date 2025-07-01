import ProtectedRoute from "@/app/components/ProtectedRoute"

export default function PedidosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
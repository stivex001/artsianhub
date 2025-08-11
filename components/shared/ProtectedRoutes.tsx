import { Suspense } from "react";
import { Loader } from "../Loader";
import ProtectedRouteContent from "./ProtectedRouteContent";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  return (
    <Suspense fallback={<Loader />}>
      <ProtectedRouteContent allowedRoles={allowedRoles} children={children} />
    </Suspense>
  );
}

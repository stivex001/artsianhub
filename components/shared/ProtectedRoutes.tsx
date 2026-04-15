import { Suspense } from "react";
import { Loader } from "../Loader";
import ProtectedRouteContent from "./ProtectedRouteContent";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
  loginPath?: string;
};

export default function ProtectedRoute({ allowedRoles, children, loginPath }: Props) {
  return (
    <Suspense fallback={<Loader />}>
      <ProtectedRouteContent allowedRoles={allowedRoles} loginPath={loginPath} children={children} />
    </Suspense>
  );
}

import { useUser } from "@/lib/firebase/getUser";

export const IsUserAdmin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { role } = useUser();
  if (role === "admin") return <>{children}</>;
};

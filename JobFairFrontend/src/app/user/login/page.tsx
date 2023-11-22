import { Link } from "@mui/material";
import LoginForm from "./components/LoginForm";

export default function page(props: {
  searchParams?: Record<"callbackUrl" | "error", string>;
}) {
  return (
    <main className="center-container h-[calc(100vh-5rem)] p-5 flex-col">
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <LoginForm searchParams={props.searchParams} />
      <Link href={"/user/register"} sx={{ marginTop: 3 }}>
        Don't have an account yet? Register Here!
      </Link>
    </main>
  );
}

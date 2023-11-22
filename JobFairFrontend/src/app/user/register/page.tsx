import RegisterForm from "./components/RegisterForm";

export default function page() {
  return (
    <main className="center-container flex-col h-[calc(100vh-5rem)] p-5">
      <h1 className="text-2xl font-bold mb-5">Register</h1>
      <RegisterForm />
    </main>
  );
}

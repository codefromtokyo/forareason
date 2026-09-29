import { SignInForm } from "@/components/SignInForm";
export default function SignIn() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="font-read text-2xl font-bold">Sign in</h1>
      <p className="text-slate-600">Save your journeys and profile on any device.</p>
      <SignInForm />
    </section>
  );
}

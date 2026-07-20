"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginActions } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, formAction, loading] = useActionState(loginActions, false);

  // const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Login successful");
      // router.push("/dashboard");
    }
    if (!state.success) {
      toast.error(state.message || "Something went wrong");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <Card className="p-6 space-y-2">
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <Input
          name="password"
          placeholder="Enter Your Password"
          type="password"
          required
        />
        <Button type="submit" className="mt-4 w-full">
          {loading ? "Loading..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};
export const loginActions = async (
  prevState: LoginState | undefined,
  formData: FormData,
) => {
  //   console.log(formData);
  console.log(prevState, "prevState");
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

     cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const decodedToken = jwt.decode(result.data.accessToken);
    console.log(decodedToken, "decodedToken");

    if(decodedToken && typeof decodedToken === "object" && "role" in decodedToken) {
      const userRole = decodedToken.role;
      if (userRole === "ADMIN") {
        redirect("/admin-dashboard");
      } else if (userRole === "AUTHOR") {
        redirect("/author-dashboard");
      }else if (userRole === "USER") {
        redirect("/dashboard");
      }
       else {
        redirect("/home");
      }
    }
  }
  // console.log(result);
  return result;
};

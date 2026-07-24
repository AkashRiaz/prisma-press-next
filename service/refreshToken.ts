"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;
  //   console.log(refreshToken, "refreshToken");

  if (!refreshToken) {
    // throw new Error("User not logged in");
    return {
      success: false,
      message: "Refresh token not found.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },

      cache: "no-store",
    },
  );

  const result = await res.json();
  //   console.log(result, "result");
  return result;
};

import { cookies } from "next/headers";

export const getPremiumNews = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  //   console.log(accessToken, "accessToken");

  if (!accessToken) {
    // throw new Error("User not logged in");
    return {
      success: false,
      message: "User not logged in",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["premium-posts"],
    },
  });

  const result = await res.json();

  return result;
};

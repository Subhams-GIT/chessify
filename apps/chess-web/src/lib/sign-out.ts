export async function signOut() {
  console.log('singout')
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to sign out");
  }

  return res.json();
}

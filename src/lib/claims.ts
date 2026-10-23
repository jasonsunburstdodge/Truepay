import { claims } from "@/content/claims";
export function getClaim(id: string) {
  const claim = claims.find((c) => c.id === id);
  if (!claim || claim.status === "banned")
    throw new Error(`Unavailable claim: ${id}`);
  return claim;
}

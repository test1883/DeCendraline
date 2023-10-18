import { DJANGO_SERVER } from "@env";

export const newChallenge = async (
  duration: number,
  type: "indoor" | "outdoor" | "explore",
  difficulty:
    | "very easy"
    | "easy"
    | "medium"
    | "hard"
    | "very hard"
    | "extreme",
  place: string | undefined
) => {
  const res = await fetch(`${DJANGO_SERVER}/challenge/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      duration,
      type,
      difficulty,
      place,
    }),
  });
  const response = await res.json();
  return response;
};

export const getAQI = async (lat: number, lon: number) => {
  const res = await fetch(`${DJANGO_SERVER}/weather/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lat,
      lon,
    }),
  });
  const response = await res.json();
  return response;
};

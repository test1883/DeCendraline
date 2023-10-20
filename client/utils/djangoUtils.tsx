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
  //console.log(DJANGO_SERVER);
  //console.log(duration);
  //console.log(type);
  //console.log(difficulty);
  //console.log(place);
  try {
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
    //console.log(res);
    const response = await res.json();
    return response.message.message.substring(1).trim();
  } catch (error) {
    //console.log(error);
  }
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

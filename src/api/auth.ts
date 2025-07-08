export interface RandomUserResponse {
  results: {
    name: {
      first: string;
      last: string;
    };
    id: {
      value: string;
    };
  }[];
}

export async function fetchRandomUser(): Promise<RandomUserResponse> {
  const response = await fetch("https://randomuser.me/api/");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
}

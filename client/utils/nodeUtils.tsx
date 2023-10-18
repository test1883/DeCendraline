import { NODE_SERVER, TW_CLIENT_ID } from "@env";

export const newUser = async (
  userName: string | null,
  about: string | null,
  address: string | null
) => {
  console.log(userName);
  console.log(about);
  console.log(address);
  const res = await fetch(`${NODE_SERVER}/api/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName,
      about,
      address,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const newChallenge = async (
  userId: string,
  challenge: {
    challengeType: "indoor" | "outdoor" | "exploration" | null;
    duration: number | null;
    difficulty:
      | "very easy"
      | "easy"
      | "medium"
      | "hard"
      | "very hard"
      | "extreme"
      | null;
    acceptedAt: number | null;
    place: string | null;
  }
) => {
  const res = await fetch(`${NODE_SERVER}/api/users/new-challenge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      challenge,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const newPost = async (post: {
  title: string;
  description: string;
  challengeDesc: string;
  createdAt: number;
  isApproved: false;
  points: number;
  treeId: string | undefined;
  userId: string | undefined;
  images: string[];
  likes: string[];
}) => {
  const res = await fetch(`${NODE_SERVER}/api/users/new-post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      post,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const userDetails = async (address: string) => {
  console.log(TW_CLIENT_ID);
  console.log(NODE_SERVER);
  const res = await fetch(`${NODE_SERVER}/api/users/user-details`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address,
    }),
  });
  console.log(res);
  const data = await res.json();
  return data;
};

export const getChallenge = async (userId: string) => {
  const res = await fetch(`${NODE_SERVER}/api/users/get-challenge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
    }),
  });
  const data = await res.json();
  return data.challenge;
};

export const likePost = async (postId: string, userId: string) => {
  const res = await fetch(`${NODE_SERVER}/api/users/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      userId,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const unlikePost = async (postId: string, userId: string) => {
  const res = await fetch(`${NODE_SERVER}/api/users/unlike`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      userId,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const approvePost = async (postId: string, address: string) => {
  const res = await fetch(`${NODE_SERVER}/api/users/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      address,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const declinePost = async (postId: string, address: string) => {
  const res = await fetch(`${NODE_SERVER}/api/users/decline`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      address,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const getPosts = async () => {
  const res = await fetch(`${NODE_SERVER}/api/users/get-posts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
};

export const getUnApprovedPosts = async (address: string) => {
  const res = await fetch(`${NODE_SERVER}/api/users/get-unapproved-posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address,
    }),
  });
  const data = await res.json();
  return data;
};

export const newTree = async (tree: {
  name: string;
  place: {
    latitude: number;
    longitude: number;
  };
  plantedAt: number;
  lastWatered: number;
  plantedBy: string;
}) => {
  const res = await fetch(`${NODE_SERVER}/api/trees/new-tree`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tree,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};
export const waterTree = async (treeId: string) => {
  const res = await fetch(`${NODE_SERVER}/api/trees/water-tree`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      treeId,
    }),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const getTrees = async (userId: string) => {
  const res = await fetch(`${NODE_SERVER}/api/trees/get-trees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
    }),
  });
  const data = await res.json();
  return data;
};

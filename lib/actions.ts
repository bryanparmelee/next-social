import { GraphQLClient } from "graphql-request";
import {
  createUserMutation,
  getUserQuery,
  postsQuery,
  getPostByIdQuery,
  createCommentMutation,
} from "@/graphql";
import { PostForm } from "@/common.types";
import { createPostMutation } from "@/graphql";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewPost = async (
  form: PostForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };
    return makeGraphQLRequest(createPostMutation, variables);
  }
};

export const fetchAllPosts = () => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(postsQuery);
};

export const getPostDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getPostByIdQuery, { id });
};

export const createNewComment = async (
  postId: string,
  creatorId: string,
  message: string
) => {
  const variables = {
    id: postId,
    input: {
      message,
      postedBy: {
        link: creatorId,
      },
    },
  };
  return makeGraphQLRequest(createCommentMutation, variables);
};

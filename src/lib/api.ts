import Preset from "@/types/Preset";
import Video from "@/types/Video";
import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_HOST + "/api";
const PUBLIC_URL = process.env.NEXT_PUBLIC_API_HOST + "/public";

/**
 * Auth
 */

export const register = async (
  email: string,
  password: string,
  username: string,
  name: string
): Promise<any> => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    {
      username,
      email,
      password,
      name,
    },
    { withCredentials: true }
  );

  // console.log(response.data);

  console.log(response.status);

  if (response.status === 200) return response.data.user as any;

  if (response.status === 400) throw new Error("Bad request");

  if (response.status === 409)
    throw new Error("Email or username already used");

  throw new Error("Failed to register user");
};

export const login = async (email: string, password: string): Promise<any> => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      username: "----",
      name: "----",
      email,
      password,
    },
    { withCredentials: true }
  );

  if (response.status === 200) return response.data.user as any;

  throw new Error("Failed to login user");
};

export const logout = async (): Promise<any> => {
  const response = await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  if (response.status === 200) return response.data.user as any;

  throw new Error("Failed to logout");
};

/**
 * User
 */

export const deleteUser = async (id: string): Promise<any> => {
  const response = await axios.delete(`${API_URL}/users/${id}`, {
    withCredentials: true,
  });

  if (response.status === 200) return response.data.user as any;

  if (response.status === 401) throw new Error("Not Authorized");

  throw new Error("Failed to fetch current user");
};

export const fetchCurrentUser = async (): Promise<any> => {
  const response = await axios.get(`${API_URL}/users/me`, {
    withCredentials: true,
  });

  if (response.status === 200) return response.data.user as any;

  if (response.status === 401) throw new Error("Not Authorized");

  throw new Error("Failed to fetch current user");
};

interface UpdateUserData {
  username?: string;
  name?: string;
}

export const updateUser = async (
  id: string,
  data: UpdateUserData
): Promise<any> => {
  const response = await axios.get(`${API_URL}/users/${id}`, {
    withCredentials: true,
  });

  if (response.status === 200) return response.data.user as any;

  throw new Error("Failed to update user");
};

/**
 * Videos
 */

export const uploadVideo = async (
  file: File,
  preset: Preset,
  cuttingMargin: string
): Promise<Video> => {
  const formData = new FormData();
  formData.append("video", file);

  const response = await axios.post(
    `${API_URL}/videos?preset=${preset}&cuttingMargin=${cuttingMargin}`,
    formData,
    {
      withCredentials: true,
    }
  );

  if (response.status === 201) return response.data.video as Video;

  throw new Error("Failed to upload video");
};

export const deleteVideo = async (id: string): Promise<Video> => {
  const response = await axios.delete(`${API_URL}/videos/${id}`, {
    withCredentials: true,
  });

  if (response.status === 200) return response.data.video as Video;

  throw new Error("Failed to delete video");
};

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await axios.get(`${API_URL}/videos`, {
    withCredentials: true,
  });

  if (response.status === 200) return response.data.videos as Video[];

  if (response.status === 401) throw new Error("Auth required");

  throw new Error("Failed to fetch all videos");
};

export const fetchVideo = async (id: string): Promise<Video> => {
  const response = await axios.get(`${API_URL}/videos/${id}`, {
    withCredentials: true,
  });

  if (response.status === 200) return response.data.video as Video;

  throw new Error("Failed to fetch video");
};

export const getVideoUrl = (video: Video): string => {
  return `${PUBLIC_URL}/originals/${video.id}.mp4`;
};

export const getSceneUrl = (video: Video, i: number): string => {
  return `${PUBLIC_URL}/scenes/${video.id}/${video.id}-${i + 1}.mp4`;
};

export const getZipUrl = (video: Video): string => {
  return `${PUBLIC_URL}/scenes/${video.id}.zip`;
};

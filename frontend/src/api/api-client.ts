import { LoginFormData } from "../pages/Login";
import { RegisterFormData } from "../pages/Register";
import { hotelType } from "../../../backend/src/types/hotel.type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/validate-token`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};

export const logOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to log out");
  }
};

/* Hotel API */
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotel/add-hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<hotelType[] | undefined> => {
  const response = await fetch(`${API_BASE_URL}/api/hotel/get-hotel`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

"use client";
import MealList from "@/components/MealList";
import { useAuth } from "@clerk/nextjs";

export default function Test456() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <>
      <div>You are currently logged in as: {userId}</div>
      <MealList />
    </>
  );
}

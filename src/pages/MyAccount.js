import React from "react";
import { useUser } from "../context/UserContext";
import OnboardingProfile from "./onboarding/Profile";

export default function MyAccount() {
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  if (!user) {
    return <p>loading</p>;
  }

  return <OnboardingProfile {...user} />;
}

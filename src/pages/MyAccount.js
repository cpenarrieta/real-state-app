import React from "react";
import { useUser } from "../context/UserContext";
import OnboardingProfile from "./onboarding/Profile";
import Loading from '../components/Loading'

export default function MyAccount() {
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  if (!user) {
    return <Loading />;
  }

  return <OnboardingProfile {...user} />;
}

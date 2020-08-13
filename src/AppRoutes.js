import React, { lazy, Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch, Redirect } from "react-router-dom";
import FourOFour from "./pages/FourOFour";
import Home from "./pages/Home";
import VerifyUserCallBack from "./pages/VerifyUserCallBack";
import AppShell from "./components/AppShell";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Properties = lazy(() => import("./pages/Properties"));
const Users = lazy(() => import("./pages/Users"));
const AuthDebugger = lazy(() => import("./pages/AuthDebugger"));
const ManageProperty = lazy(() => import("./pages/ManageProperty"));
const MyAccount = lazy(() => import("./pages/MyAccount"));

const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="*">
      <FourOFour />
    </Route>
  </Switch>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? <AppShell>{children}</AppShell> : <Redirect to="/" />
      }
    ></Route>
  );
};

const AdminRoute = ({ children, ...rest }) => {
  const { user, isAuthenticated } = useAuth0();
  const roles = user[`${process.env.REACT_APP_JWT_NAMESPACE}/roles`];
  const isAdmin = roles?.[0] === "admin" ? true : false;
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated && isAdmin ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

export const AppRoutes = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <div className="h-screen flex justify-center">loading logo</div>;
  }

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <AuthenticatedRoute path="/verify_user">
            <VerifyUserCallBack />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/property/manage/:propertyId">
            <ManageProperty />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/properties">
            <Properties />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/my-account">
            <MyAccount />
          </AuthenticatedRoute>
          <AdminRoute path="/users">
            <Users />
          </AdminRoute>
          <AdminRoute path="/auth-debugger">
            <AuthDebugger />
          </AdminRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

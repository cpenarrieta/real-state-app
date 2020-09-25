import React, { lazy, Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch, Redirect } from "react-router-dom";
import FourOFour from "./pages/FourOFour";
import Home from "./pages/Home";
import VerifyUserCallBack from "./pages/VerifyUserCallBack";
import AppShell from "./components/appShell/AppShell";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Properties = lazy(() => import("./pages/Properties"));
const Users = lazy(() => import("./pages/Users"));
const AuthDebugger = lazy(() => import("./pages/AuthDebugger"));
const ManageProperty = lazy(() => import("./pages/manageProperty"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const SuccessPayment = lazy(() => import("./pages/SuccessPayment"));
const Leads = lazy(() => import("./pages/Leads"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Settings = lazy(() => import("./pages/Settings"));
const Support = lazy(() => import("./pages/Support"));

const LoadingFallback = () => <div className="p-4">Loading...</div>;

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
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="h-screen flex justify-center">loading logo</div>;
  }

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? <AppShell>{children}</AppShell> : <Redirect to="/" />
      }
    ></Route>
  );
};

const AuthenticatedRouteNoAppShell = ({ children, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="h-screen flex justify-center">loading logo</div>;
  }

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? <>{children}</> : <Redirect to="/" />)}
    ></Route>
  );
};

const AdminRoute = ({ children, ...rest }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="h-screen flex justify-center">loading logo</div>;
  }

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
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <AuthenticatedRouteNoAppShell exact path="/verify_user">
            <VerifyUserCallBack />
          </AuthenticatedRouteNoAppShell>
          <AuthenticatedRoute exact path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/manage-property/:propertyId">
            <ManageProperty />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/my-properties">
            <Properties />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/my-account">
            <MyAccount />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/payment-success">
            <SuccessPayment />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/leads">
            <Leads />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/analytics">
            <Analytics />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/settings">
            <Settings />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/support">
            <Support />
          </AuthenticatedRoute>
          <AdminRoute exact path="/users">
            <Users />
          </AdminRoute>
          <AdminRoute exact path="/auth-debugger">
            <AuthDebugger />
          </AdminRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

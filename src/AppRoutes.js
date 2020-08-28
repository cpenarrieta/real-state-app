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
const PreviewProperty = lazy(() => import("./pages/PreviewProperty"));
const Payment = lazy(() => import("./pages/Payment"));
const SuccessPayment = lazy(() => import("./pages/SuccessPayment"));
const PropertyLeads = lazy(() => import("./pages/PropertyLeads"));

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
          <AuthenticatedRoute exact path="/verify_user">
            <VerifyUserCallBack />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/manage-property/:propertyId">
            <ManageProperty />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/manage-property/:propertyId/leads">
            <PropertyLeads />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/manage-property/:propertyId/preview">
            <PreviewProperty />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/payment/:propertyId">
            <Payment />
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

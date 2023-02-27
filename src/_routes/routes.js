import React from "react";
const Overview = React.lazy(() => import("../pages/overview"));

const routes = [
  { path: '/', exact: true, name: 'Overview', component: Overview },
  
];

export default routes;

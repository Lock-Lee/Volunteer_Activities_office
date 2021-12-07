import React from "react";

const user = React.lazy(() => import("./views/master-data/user"));

const routes = [
  {
    path: "/user",
    name: "จัดการพนักงาน",
    permission_name: "user",
    component: user,
  },
];

export default routes;

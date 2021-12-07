const accessMenu = ({ PERMISSIONS, notifications = [] }) => {
  const navigations = [];
  const masters = [];

  var masterscount = 0;

  if (PERMISSIONS == undefined) {
    PERMISSIONS = [];
  }

  masters.push({
    _tag: "CSidebarNavItem",
    name: "พนักงาน",
    to: "/user",
    icon: <i className="c-sidebar-nav-icon fa fa-user" />,
    exact: false,
  });

  navigations.push(
    {
      _tag: "CSidebarNavTitle",
      _children: ["ระบบจัดการพื้นฐาน"],
    },
    ...masters
  );

  return navigations;
};

export default accessMenu;

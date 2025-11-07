import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import { Outlet } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { FaHome, FaLaptop, FaUser, FaTools, FaDoorOpen } from "react-icons/fa";

function DashboardLayout() {
  const [openSidebar, setOpenSidebar] = useState(() => {
    const saved = localStorage.getItem("sidebarState");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(openSidebar));
  }, [openSidebar]);

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  return (
    <main className="w-full min-h-screen flex">
      <Sidebar.SidebarRoot className={`${openSidebar && "w-22"}`}>
        <Sidebar.SidebarContainer className="flex flex-col flex-1">
          <Sidebar.SidebarHeader className="flex justify-between">
            <Card.CardRoot className="flex items-center">
              <Card.CardAvatar
                className="w-8 h-7 rounded-full"
                source={
                  "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                }
              />
              <Card.CardContainer className="p-2">
                {openSidebar ? "" : <Card.CardTitle label="Administrator" />}
              </Card.CardContainer>
            </Card.CardRoot>
            <Sidebar.SidebarButtonMenu handleSubmit={toggleSidebar} />
          </Sidebar.SidebarHeader>

          {openSidebar ? (
            <Sidebar.SidebarBody className="flex flex-col space-y-2 mt-4">
              <Sidebar.SidebarLink icon={FaHome} href="/dashboard" />
              <Sidebar.SidebarLink icon={FaLaptop} href="/dashboard/computers" />
              <Sidebar.SidebarLink icon={FaUser} href="/dashboard/clients" />
              <Sidebar.SidebarLink icon={FaTools} href="/dashboard/settings" />
            </Sidebar.SidebarBody>
          ) : (
            <Sidebar.SidebarBody className="flex flex-col space-y-2 mt-4">
              <Sidebar.SidebarLink
                icon={FaHome}
                href="/dashboard"
                label="Home"
              />
              <Sidebar.SidebarLink
                icon={FaLaptop}
                href="/dashboard/computers"
                label="Computers"
              />
              <Sidebar.SidebarLink
                icon={FaUser}
                href="/dashboard/clients"
                label="Clients"
              />
              <Sidebar.SidebarLink
                icon={FaTools}
                href="/dashboard/settings"
                label="Settings"
              />
            </Sidebar.SidebarBody>
          )}
        </Sidebar.SidebarContainer>

        <Sidebar.SidebarFooter className="flex justify-center">
          <Sidebar.SidebarButton
            icon={FaDoorOpen}
            className="bg-blue-500"
            label="Sair"
          />
        </Sidebar.SidebarFooter>
      </Sidebar.SidebarRoot>

      <Fragment>
        <Outlet />
      </Fragment>
    </main>
  );
}

export default DashboardLayout;

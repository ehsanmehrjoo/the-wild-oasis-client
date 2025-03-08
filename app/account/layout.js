import SideNavigation from "@/app/_components/SideNavigation"

function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] h-full gap-12">
      {/* Side Navigation (Visible on Mobile and Desktop) */}
      <div className="block md:block">
        <SideNavigation />
      </div>

      {/* Main Content */}
      <div className="py-1">{children}</div>
    </div>
  )
}

export default Layout;
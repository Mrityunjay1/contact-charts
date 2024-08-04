import { Menu } from "lucide-react";
import { Button } from "./Button";
import { useSidebarContext } from "../context/SidebarContext";

export function PageHeader() {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection />
    </div>
  );
}

export function PageHeaderFirstSection() {
  const { toggle } = useSidebarContext();
  return (
    <div className="flex gap-4 items-center flex-shrink-0">
      <Button onClick={toggle} className="bg-red-300">
        <Menu />
      </Button>
      <a href="/">Taiyo Contact manager</a>
    </div>
  );
}

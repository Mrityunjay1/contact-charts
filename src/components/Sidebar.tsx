import { ChartBarIcon, ChevronDown, ChevronUp, Home, User } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import { useSidebarContext } from "../context/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";
import { useLocation } from "react-router-dom";

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  const location = useLocation();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4  flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallsideBarItem Icon={Home} title="Home" url="/" />
        <SmallsideBarItem Icon={User} title="Contact" url="/create-contact" />
        <SmallsideBarItem Icon={ChartBarIcon} title="Charts" url="/charts" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-black opacity-50"
        ></div>
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto h-screen scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>

        <LargeSidebarSection visibleItemCount={3}>
          <LargeSidebarItem
            Icon={Home}
            title="Home"
            url="/"
            isActive={location.pathname === "/"}
          />
          <LargeSidebarItem
            Icon={User}
            title="Contact"
            url="/create-contact"
            isActive={location.pathname === "/create-contact"}
          />
          <LargeSidebarItem
            Icon={ChartBarIcon}
            title="Charts"
            url="/charts"
            isActive={location.pathname === "/charts"}
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

type SmallsideBarProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallsideBarItem({ Icon, title, url }: SmallsideBarProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => {
            setIsExpanded((e) => !e);
          }}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div> {isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

type LargesideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LargesideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({
          variant: "ghost",
        }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-slate-50" : undefined
        }`
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}

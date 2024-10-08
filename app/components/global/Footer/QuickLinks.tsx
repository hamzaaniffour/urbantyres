import React from "react";
import Link from "next/link";
import { getMenuByName, MenuItem } from "@/services/menu";
import { FaCaretRight } from "react-icons/fa";

const cleanCategoryPath = (path: string): string => {
  if (path.startsWith("/category/")) {
    return "/" + path.split("/").slice(2).join("/");
  }
  return path;
};

const MenuItemComponent = ({ item }: { item: MenuItem }) => {
  const rawHref =
    item.path ||
    item.url ||
    item.uri ||
    `/${item.label.toLowerCase().replace(/\s+/g, "-")}`;
  const href = cleanCategoryPath(rawHref);

  return (
    <li className="mb-1">
      <Link
        href={href}
        className={`text-black font-semibold text-md hover:text-orange-600 transition-all`}
      >
        <FaCaretRight
          className={`inline-block size-4 text-orange-600 relative -top-[2px]`}
        />
        {item.label}
      </Link>
    </li>
  );
};

export default async function Menu() {
  const menuItems = await getMenuByName("Primary");

  if (!menuItems) {
    return <div>Menu not found</div>;
  }

  if (typeof menuItems === "string") {
    return <div>{menuItems}</div>;
  }

  const topLevelItems = menuItems.filter((item) => !item.parentId);

  return (
    <div className="">
      <ul className="">
        {topLevelItems.map((item: any) => (
          <MenuItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

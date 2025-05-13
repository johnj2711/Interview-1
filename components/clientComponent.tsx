"use client";
import { useState } from "react";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Tabs from "@/components/Tabs";
import Content from "@/components/DrawerContent";
function Cart({ videos }: { videos: any[] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="min-h-screen p-4">
      <div onClick={openDrawer} className="cursor-pointer">
        <Button />
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <Tabs />
        <Content />
      </Drawer>
    </div>
  );
}

export default Cart;

"use client";
import { useEffect, useRef, ReactNode, memo } from "react";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string; // 抽屉宽度
}

// 客户端Drawer组件
const ClientDrawer = memo(function ClientDrawer({ isOpen, onClose, children, title = "购物车", width = "514px" }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // 点击抽屉外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // 当抽屉打开时禁止背景滚动
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // 按ESC键关闭抽屉
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* 遮罩层 */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 抽屉 */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 box-border bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col justify-between h-full`}
        style={{ width }}
      >
        <header className="px-10 w-full font-medium text-black text-3xl flex-shrink-0 lg:text-xl flex justify-between items-center text-left mb-4 mt-8">
          <span className="text-2xl font-bold">{title}</span>
          {/* 关闭按钮 */}
          <button onClick={onClose} className="rounded-full hover:bg-gray-100" aria-label="关闭抽屉">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        {/* 内容 */}
        <div className="flex-1 overflow-y-auto flex flex-col">{children}</div>
      </div>
    </>
  );
});

export default ClientDrawer;

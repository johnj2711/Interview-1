import { useState, useRef, useEffect, forwardRef } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState(1); // 1 视频 2 图片 3 音频
  const TabName = ["视频123", "图片333333", "音频444"];
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: 'translateX(0px)' });
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 确保refs数组有足够的元素
  if (tabRefs.current.length !== TabName.length) {
    tabRefs.current = Array(TabName.length).fill(null);
  }

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab - 1];
    const container = containerRef.current;
    
    if (activeTabElement && container) {
      const tabRect = activeTabElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate position relative to the container
      const offset = activeTabElement.offsetLeft;
      
      setIndicatorStyle({
        width: tabRect.width,
        transform: `translateX(${offset}px)`
      });
    }
  }, [activeTab]);

  return (
    <div 
      className="flex items-center text-xl font-medium relative pb-4 mt-8"
      ref={containerRef}
    >
      {TabName.map((item, index) => (
        <TabItem 
          key={index} 
          name={item} 
          active={activeTab === index + 1} 
          onClick={() => setActiveTab(index + 1)}
          ref={el => { tabRefs.current[index] = el; }}
        />
      ))}
      <div 
        className="h-1 bg-[#0D0D0D] rounded-[4px] absolute bottom-0 transition-all duration-300 ease-in-out" 
        style={indicatorStyle}
      ></div>
    </div>
  );
}

export default Tabs;

const TabItem = forwardRef<HTMLDivElement, { 
  name: string; 
  active: boolean; 
  onClick: () => void;
}>(({ name, active, onClick }, ref) => {
  return (
    <div 
      className={`${active ? "text-[#0D0D0D]" : "text-[#888888]"} px-1 ml-11`} 
      onClick={onClick}
      ref={ref}
    >
      {name}
    </div>
  );
});

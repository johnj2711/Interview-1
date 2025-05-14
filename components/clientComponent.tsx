"use client";
import { useEffect, useMemo, useState, memo } from "react";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Tabs from "@/components/Tabs";
import Content from "@/components/DrawerContent";
import PurchaseButton from "@/components/PurchaseButton";

const Cart = memo(function Cart({
  videos,
  fonts,
  music,
  downloadVideos,
  downloadFonts,
  downloadMusic
}: {
  videos: ItemInterface[];
  fonts: ItemInterface[];
  music: ItemInterface[];
  downloadVideos: ItemInterface[];
  downloadFonts: ItemInterface[];
  downloadMusic: ItemInterface[];
}) {
  // 变量定义部分
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [checkedMap, setCheckedMap] = useState<Map<number, boolean>>(new Map());
  const [dataMap, setDataMap] = useState<Map<number, ItemInterface[]>>(
    new Map([
      [1, videos],
      [2, fonts],
      [3, music]
    ])
  );
  const downloadMap = useMemo(() => {
    const arr = [...downloadVideos, ...downloadFonts, ...downloadMusic];
    const map = new Map();
    arr.forEach((item) => {
      map.set(item.vid || item.fid || item.mid, item.licType);
    });
    return map;
  }, [downloadVideos, downloadFonts, downloadMusic]);
  const [totalPrice, setTotalPrice] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0
  });
  const [itemCount, setItemCount] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0
  });
  const [activeTab, setActiveTab] = useState(1); // 1 视频 2 图片 3 音频
  const [isSelected, setIsSelected] = useState<boolean>(false);

  // 计算属性
  const renderData = useMemo(() => {
    return dataMap.get(activeTab);
  }, [activeTab]);

  const lenArray = useMemo(() => {
    return [videos.length, fonts.length, music.length];
  }, [dataMap]);

  const totalLength = useMemo(() => {
    return lenArray.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }, [lenArray]);

  // 副作用
  useEffect(() => {
    // 当活动标签变更时，更新全选状态
    setIsSelected(itemCount[activeTab] == dataMap.get(activeTab)?.length);
  }, [activeTab]);

  // 方法定义部分
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleChecked = (index: number, checked: boolean, type: number, price: number) => {
    // 处理单个项目选中状态变化
    setCheckedMap(new Map(checkedMap.set(index, checked)));
    if (checked) {
      console.log(totalPrice, price);
      setTotalPrice({ ...totalPrice, [type]: totalPrice[type] + price });
      setItemCount({ ...itemCount, [type]: itemCount[type] + 1 });
    } else {
      setTotalPrice({ ...totalPrice, [type]: totalPrice[type] - price });
      setItemCount({ ...itemCount, [type]: itemCount[type] - 1 });
    }
  };

  const handlePurchase = () => {
    // 实现购买逻辑
    console.log("Purchase completed");
    console.log(activeTab == 1 ? "视频" : activeTab == 2 ? "图片" : "音乐", checkedMap, totalPrice);
  };

  const handleSelectAll = (checked: boolean) => {
    // 处理全选功能
    const idName = activeTab === 1 ? "vid" : activeTab === 2 ? "fid" : "mid";
    setIsSelected(checked);
    if (checked) {
      let totalP = 0;
      let totalCount = 0;
      dataMap.get(activeTab)?.forEach((item) => {
        const id = item[idName as keyof ItemInterface] as number;
        if (id !== undefined && item.auditStatus === "SUCCESS") {
          setCheckedMap(new Map(checkedMap.set(id, true)));
          totalP += item.price;
          totalCount += 1;
        }
      });
      setTotalPrice({ ...totalPrice, [activeTab]: totalP });
      setItemCount({ ...itemCount, [activeTab]: totalCount });
    } else {
      dataMap.get(activeTab)?.forEach((item) => {
        const id = item[idName as keyof ItemInterface] as number;
        if (id !== undefined) {
          setCheckedMap(new Map(checkedMap.set(id, false)));
        }
      });
      setTotalPrice({ ...totalPrice, [activeTab]: 0 });
      setItemCount({ ...itemCount, [activeTab]: 0 });
    }
  };

  const handleRemove = (index: number) => {
    // 处理移除功能
    const idName = activeTab === 1 ? "vid" : activeTab === 2 ? "fid" : "mid";

    const removeList: ItemInterface[] = dataMap.get(activeTab) || [];
    const findIndex: number = removeList.findIndex((item) => item[idName] === index);
    if (checkedMap.has(index) && checkedMap.get(index)) {
      const newMap = new Map(checkedMap);
      newMap.delete(index);
      setCheckedMap(newMap);
      setTotalPrice({ ...totalPrice, [activeTab]: totalPrice[activeTab] - removeList[findIndex].price });
      setItemCount({ ...itemCount, [activeTab]: itemCount[activeTab] - 1 });
    }
    if (findIndex !== -1) {
      removeList.splice(findIndex, 1);
      setDataMap(new Map(dataMap.set(activeTab, removeList)));
    }
  };

  return (
    <div>
      <div onClick={openDrawer} className="cursor-pointer">
        <Button totalLength={totalLength} />
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} lenArray={lenArray} />
        {renderData && (
          <Content
            renderData={renderData}
            checkedMap={checkedMap}
            type={activeTab}
            handleChecked={handleChecked}
            handleRemove={handleRemove}
            downloadMap={downloadMap}
          />
        )}
        <PurchaseButton
          price={totalPrice[activeTab]}
          count={itemCount[activeTab]}
          isSelected={isSelected}
          onPurchase={handlePurchase}
          onSelectAll={handleSelectAll}
        />
      </Drawer>
    </div>
  );
});

export default Cart;

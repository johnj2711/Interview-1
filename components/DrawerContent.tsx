import { useMemo, memo } from "react";

const Content = memo(function Content({
  renderData,
  checkedMap,
  type,
  handleChecked,
  handleRemove,
  downloadMap
}: {
  renderData: ItemInterface[];
  checkedMap: Map<number, boolean>;
  type: number;
  handleChecked: (index: number, checked: boolean, type: number, price: number) => void;
  handleRemove: (index: number) => void;
  downloadMap: Map<number, string>;
}) {
  return (
    <div className="pt-5 flex-1 min-w-0 overflow-scroll pb-12 mb-auto mt-0 px-5">
      {renderData.map((item, index) => (
        <CartItem
          key={item.vid || item.fid || item.mid || index}
          item={item}
          checkedMap={checkedMap}
          type={type}
          index={item.vid || item.fid || item.mid || index}
          handleChecked={handleChecked}
          handleRemove={handleRemove}
          downloadMap={downloadMap}
        />
      ))}
    </div>
  );
});

export default Content;

const CartItem = memo(function CartItem({
  item,
  checkedMap,
  type,
  index,
  handleChecked,
  handleRemove,
  downloadMap
}: {
  item: ItemInterface;
  checkedMap: Map<number, boolean>;
  type: number;
  index: number;
  handleChecked: (index: number, checked: boolean, type: number, price: number) => void;
  handleRemove: (index: number) => void;
  downloadMap: Map<number, string>;
}) {
  const checked = useMemo(() => {
    return (checkedMap && checkedMap.has(index) && checkedMap.get(index)) || false;
  }, [index, checkedMap]);

  const isDisabled = item.auditStatus === "FAIL";

  const isDownloaded = useMemo(() => {
    if (downloadMap && downloadMap.has(index) && downloadMap.get(index)) {
      if (item.licType === downloadMap.get(index)) {
        return true;
      } else {
        if (downloadMap.get(index) === "LPPLUS" && item.licType === "LP") {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }, [index, downloadMap]);

  return (
    <div
      onClick={() => !isDisabled && handleChecked(index, checkedMap.get(index) ? false : true, type, item.price)}
      className={`p-5 bg-white hover:bg-[#F5F5F5] rounded-lg w-full transition-colors group flex box-border`}
    >
      <div className={`flex items-center justify-center h-[66px] ${isDisabled ? "cursor-not-allowed opacity-70" : ""}`}>
        <input
          type="checkbox"
          className="mr-4 self-center"
          checked={checked}
          disabled={isDisabled}
          onChange={() => !isDisabled && handleChecked(index, checkedMap.get(index) ? false : true, type, item.price)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={item.coverImage || "/main.webp"}
              alt={item.title}
              className={`w-[117px] h-[66px] rounded object-cover ${isDisabled ? "opacity-70" : ""}`}
            />
            {isDisabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <span className="text-white px-2 py-1 rounded text-sm font-medium">已下架</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between ml-3 flex-1 py-1 h-[66px] min-w-0">
            <h3 className="font-medium text-[16px] overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h3>
            <div className="flex items-center text-[14px] text-[#404040] font-normal">
              <span className="">ID: {item.vid || item.fid || item.mid}</span>
              {type != 3 && <div className="w-[1px] h-3 ml-3 mr-3 bg-[#CCCCCC]"></div>}
              {type != 3 && <span className="">类型: {renderItemType(type, item.softwareType)}</span>}
            </div>
          </div>
        </div>
        {isDownloaded && <div className="mt-3 text-sm text-[#404040]">您已购买过此素材</div>}
        <div className="flex justify-between mt-4">
          <div
            className="text-[14px] text-[#0D0D0D] font-medium opacity-0 group-hover:opacity-100 cursor-pointer"
            onClick={(e) => {
              console.log("remove", index);
              handleRemove(index);
              e.stopPropagation();
            }}
          >
            移除
          </div>
          <div className="font-normal">
            {renderItemLicType(item.licType)} <span className="text-2xl font-medium ml-4">{item.price}</span>元
          </div>
        </div>
      </div>
    </div>
  );
});

function renderItemType(type: number, softwareType?: string): string {
  switch (type) {
    case 1:
      return "视频素材";
    case 2:
      return "图片素材";
    case 3:
      return "音频素材";
    default:
      return softwareType || "未知类型";
  }
}

function renderItemLicType(licType: string): string {
  switch (licType) {
    case "NP":
      return "个人授权";
    case "LP":
      return "企业授权";
    case "LPPLUS":
      return "企业PLUS";
    default:
      return "未知类型";
  }
}


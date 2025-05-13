function Content() {
  return (
    <div className="mt-5">
      <CartItem />
    </div>
  );
}

export default Content;

function CartItem() {
  return (
    <div className="px-5">
      <div className="p-5 bg-white hover:bg-[#F5F5F5] rounded-lg w-full transition-colors group flex">
        <div className="flex items-center justify-center h-[66px]">
          <input type="checkbox" className="mr-4 self-center" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center">
            <img src="/main.webp" alt="天坛" className="w-[117px] h-[66px] rounded object-cover" />
            <div className="flex flex-col justify-between ml-3 flex-1 py-1 h-[66px]">
              <h3 className="font-medium text-[16px]">天坛</h3>
              <div className="flex items-center text-[14px] text-[#404040] font-normal">
                <span className="">ID: 764992</span>
                <div className="w-[1px] h-3 ml-3 mr-3 bg-[#CCCCCC]"></div>
                <span className="">类型: 图片素材</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-[14px] text-[#0D0D0D] font-medium opacity-0 group-hover:opacity-100">移除</div>
            <div className="font-normal">
              个人授权 <span className="font-medium">18元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

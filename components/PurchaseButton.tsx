import React, { useState, memo } from "react";

interface PurchaseButtonProps {
  price?: number;
  count?: number;
  isSelected?: boolean;
  onPurchase?: () => void;
  onSelectAll?: (checked: boolean) => void;
}

const PurchaseButton = memo(function PurchaseButton({ price = 0, count = 0, isSelected = false, onPurchase = () => {}, onSelectAll = (checked: boolean) => {} }: PurchaseButtonProps) {

  const handleCheckboxChange = () => {
    onSelectAll(!isSelected);
  };

  return (
    <div>
      <div className="bg-[#F0F0F0] w-full h-[2px]"></div>
      <div className="bg-white rounded-lg shadow-md px-10 py-7 flex flex-col gap-4 box-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              className="mr-2 h-5 w-5 rounded-sm"
            />
            <span className="text-gray-600" onClick={handleCheckboxChange}>全选</span>
          </div>
          <div className="text-gray-600">
            已选 <span>{count}</span> 件 总计:
            <span className="text-red-500 text-3xl font-medium mx-1 ">{price}</span>
            <span className="text-red-500">元</span>
          </div>
        </div>

        <button 
          onClick={onPurchase} 
          disabled={count === 0}
          className={`w-full py-3 rounded-full font-medium ${
            count === 0 
              ? 'bg-[#ccc] text-white cursor-not-allowed' 
              : 'bg-black text-white'
          }`}
        >
          立即购买
        </button>
      </div>
    </div>
  );
});

export default PurchaseButton;

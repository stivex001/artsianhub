import React, { useState } from "react";
import OptionsPopup from "./PopupOptions";
import { FileX, MoreHorizontal } from "lucide-react";
import { Spinner } from "./Spinner";
import { CustomButton } from "../clickable/CustomButton";
import { renderData } from "@/utils/renderData";
import InputCustomBox from "../controlledInputs/InputCheckBox";

type TablesComponentProp = {
  data: any[];
  isLoading: boolean;
  hideActionButton?: boolean;
  headers: string[];
  options?: any[];
  popUpFunction?: any;
  showCheckBox?: boolean;
  buttonFunction?: (index: number, row: any) => void;
  getFormattedValue?: any;
  toggleRowFunction?: (index: number, val: boolean) => void;
  toggleSelectAllFunction?: (val: boolean) => void;
  setSelectedRows?: any;
  selectedRows?: number[];
  headerClassName?: string;
  headerBackgroundColor?: string;
};

const TablesComponent = ({
  data,
  isLoading,
  hideActionButton = false,
  headers,
  options = [],
  popUpFunction,
  showCheckBox = true,
  buttonFunction,
  getFormattedValue,
  toggleRowFunction,
  toggleSelectAllFunction,
  setSelectedRows,
  selectedRows = [],
  headerClassName = "py-3.5 px-4 text-left font-medium text-gray-500 text-sm rounded-lg",
  headerBackgroundColor = "#F0F2F5",
}: TablesComponentProp) => {
  const [selected, setSelected] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const toggleSelectAll = () => {
    const isAllSelected = selectedRows.length === data.length;
    if (typeof toggleSelectAllFunction === "function") {
      toggleSelectAllFunction(!isAllSelected);
    }
    if (typeof setSelectedRows === "function") {
      setSelectedRows(isAllSelected ? [] : data.map((_, index) => index));
    }
  };

  const toggleRow = (index: number, val: any) => {
    if (typeof toggleRowFunction === "function") {
      toggleRowFunction(index, val);
    }
    if (typeof setSelectedRows === "function") {
      setSelectedRows(
        selectedRows.includes(index)
          ? selectedRows.filter((i) => i !== index)
          : [...selectedRows, index]
      );
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <FileX size={64} className="text-gray-400" />
        <span className="text-lg font-medium text-brandGreen mt-4">
          No Data
        </span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full no-scrollbar scrollbar-hidden">
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col h-full no-scrollbar scrollbar-hidden">
        {/* Container with relative positioning and overflow */}
        <div className="relative flex flex-col h-full overflow-auto">
          <table className="w-full no-scrollbar scrollbar-hidden">
            {/* Fixed header that stays in place */}
            <thead
              style={{
                backgroundColor: headerBackgroundColor,
                position: "sticky",
                top: 0,
                zIndex: 10,
                width: "100%",

                // boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
              }}
            >
              <tr className="border-b rounded-[10px] bg-[#5691D1] ">
                {headers.map((header, i) => (
                  <th key={i} className={headerClassName}>
                    <div className="flex gap-3 items-center whitespace-nowrap">
                      {i === 0 && showCheckBox && (
                        <InputCustomBox
                          checked={
                            data.length > 0 &&
                            selectedRows.length === data.length
                          }
                          onChange={toggleSelectAll}
                          // indeterminate={
                          //   selectedRows.length > 0 &&
                          //   selectedRows.length < data.length
                          // }
                        />
                      )}
                      {header}
                    </div>
                  </th>
                ))}
                {!hideActionButton && <th className={headerClassName}></th>}
              </tr>
              <tr className="h-2" aria-hidden="true"></tr>
            </thead>
            <tbody style={{ backgroundColor: "red" }} className="">
              {data.map((eachRow, index) => {
                const formatedValue = getFormattedValue(eachRow, index);

                console.log(formatedValue, "row");

                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 ? "bg-white" : "bg-[#D9D9D9]"
                    } border-b last:border-b-0`}
                    // className={`bg-white border-b last:border-b-0`}
                  >
                    {formatedValue.map((item: any, i: number) => (
                      <td key={i} className="px-4 py-7 text-sm text-black mb-5">
                        <div className="flex items-center gap-3 whitespace-nowrap">
                          {i === 0 && showCheckBox && (
                            <InputCustomBox
                              onChange={() => toggleRow(index, eachRow)}
                              checked={selectedRows.includes(index)}
                            />
                          )}

                          <p className="text-black text-sm">{item} </p>
                        </div>
                      </td>
                    ))}
                    {!hideActionButton && (
                      <td className="whitespace-nowrap px-4">
                        <ActionButtons
                          eachRow={eachRow}
                          index={index}
                          currentIndex={currentIndex}
                          showOptions={showOptions}
                          options={options}
                          setSelected={setSelected}
                          setShowOptions={setShowOptions}
                          setCurrentIndex={setCurrentIndex}
                          buttonFunction={buttonFunction}
                          popUpFunction={popUpFunction}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex-1 flex flex-col h-full">
        {/* Mobile header with sticky positioning */}
        <div
          style={{
            backgroundColor: headerBackgroundColor,
            position: "sticky",
            top: 0,
            zIndex: 10,
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow
          }}
          className="px-4 py-3 flex items-center gap-3 border-b"
        >
          {showCheckBox && (
            <>
              <InputCustomBox
                checked={data.length > 0 && selectedRows.length === data.length}
                onChange={toggleSelectAll}
                // indeterminate={
                //   selectedRows.length > 0 && selectedRows.length < data.length
                // }
              />
              <span className="font-medium text-sm">Select All</span>
            </>
          )}
        </div>
        <div className="h-2" aria-hidden="true"></div>
        {/* Scrollable content area */}
        <div className="flex-1 overflow-auto">
          <div className="divide-y">
            {data.map((eachRow, index) => {
              const formatedValue = getFormattedValue(eachRow, index);
              return (
                <div
                  key={index}
                  className={`p-4 ${index % 2 ? "bg-white" : "bg-[#fafafa]"}`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      {showCheckBox && (
                        <div className="pt-1">
                          <InputCustomBox
                            onChange={() => toggleRow(index, eachRow)}
                            checked={selectedRows.includes(index)}
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col gap-3">
                        <div className="flex flex-wrap gap-4">
                          {formatedValue.map((item: any, i: number) => (
                            <div key={i} className="text-sm text-gray-900">
                              {renderData(item)}
                            </div>
                          ))}
                        </div>
                        {!hideActionButton && options.length === 0 && (
                          <div className="w-full">
                            <ActionButtons
                              eachRow={eachRow}
                              index={index}
                              currentIndex={currentIndex}
                              showOptions={showOptions}
                              options={options}
                              setSelected={setSelected}
                              setShowOptions={setShowOptions}
                              setCurrentIndex={setCurrentIndex}
                              buttonFunction={buttonFunction}
                              popUpFunction={popUpFunction}
                            />
                          </div>
                        )}
                      </div>
                      {!hideActionButton && options.length > 0 && (
                        <div className="flex-shrink-0">
                          <ActionButtons
                            eachRow={eachRow}
                            index={index}
                            currentIndex={currentIndex}
                            showOptions={showOptions}
                            options={options}
                            setSelected={setSelected}
                            setShowOptions={setShowOptions}
                            setCurrentIndex={setCurrentIndex}
                            buttonFunction={buttonFunction}
                            popUpFunction={popUpFunction}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

type ActionButtonProps = {
  eachRow: any;
  index: number;
  currentIndex: any;
  showOptions: boolean;
  options: any[];
  setSelected: (row: any) => void;
  setShowOptions: (show: boolean) => void;
  setCurrentIndex: any;
  buttonFunction: any;
  popUpFunction: any;
};

const ActionButtons = ({
  eachRow,
  index,
  currentIndex,
  showOptions,
  options,
  setSelected,
  setShowOptions,
  setCurrentIndex,
  buttonFunction,
  popUpFunction,
}: ActionButtonProps) => (
  <div className="flex items-center space-x-4">
    <div
      className={options.length === 0 ? "w-full" : ""}
      onClick={() => {
        setSelected(eachRow);
        if (options.length > 0) {
          setShowOptions(index === currentIndex ? !showOptions : true);
        } else {
          buttonFunction?.(eachRow);
        }
        setCurrentIndex(index);
      }}
    >
      {options.length > 0 ? (
        <MoreHorizontal className="cursor-pointer text-gray-500" />
      ) : (
        <CustomButton
          label="Accept"
          // buttonText="View"
          // radius="rounded-full"
          // className="w-full p-1"
        />
      )}
    </div>
    <div className="relative">
      {currentIndex === index && showOptions && (
        <OptionsPopup
          options={options}
          popUpFunction={(option: any, inx: number) => {
            setShowOptions(false);

            popUpFunction(option, inx, eachRow);
          }}
        />
      )}
    </div>
  </div>
);

export default TablesComponent;

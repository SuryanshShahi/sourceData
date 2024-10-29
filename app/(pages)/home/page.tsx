"use client";
import Button from "@/app/shared/buttons/Button";
import Divider from "@/app/shared/divider";
import Heading from "@/app/shared/heading";
import Table from "@/app/shared/table/Index";
import { ITableHeading } from "@/app/shared/types";
import { ReactNode } from "react";
import useHook from "./useHook";
import { LuEye, LuSave, LuUpload } from "react-icons/lu";
import { BiSolidSave } from "react-icons/bi";

const Page = () => {
  const { sourceData, masterData, values, setFieldValue } = useHook();
  const data: ITableHeading[] = [
    { title: "Master Field", variant: "text" },
    { title: "Transformation", variant: "input" },
    { title: "", variant: "actions" },
    { title: "Result", variant: "text" },
    { title: "Actions", variant: "actions" },
  ];

  const tableData: {
    masterField: string[];
    transformation: ReactNode[];
    calculate: ReactNode[];
    result: string[];
    actions: ReactNode[];
  } = {
    masterField: masterData?.fields?.map((e) => e?.name) || [],
    transformation:
      masterData?.fields?.map((_, idx) => (
        <input
          type="text"
          onChange={(e) =>
            setFieldValue(`[${idx}].expression`, e?.target?.value)
          }
          value={values?.[idx]?.expression || ""}
          className="border border-gray-300 rounded-md p-2 w-full outline-none"
        />
      )) || [],
    calculate:
      masterData?.fields?.map((item) => (
        <Button
          onClick={() => {}}
          btnName="Evaluate"
          size="xs"
          variant="secondary-color"
          className="!px-2 !py-1"
        />
      )) || [],
    result: masterData?.fields?.map((item) => "NA") || [],
    actions:
      masterData?.fields?.map((item) => (
        <div className="flex items-center gap-x-2" title="Save">
          <Button
            className="!p-2 !border-none"
            variant="secondary-color"
            icon={<LuSave size={18} className="text-brand-tertiary" />}
            onClick={() => {}}
          />
        </div>
      )) || [],
  };

  return (
    <div className="container flex mx-auto my-10 gap-x-6">
      <div className="space-y-6 border border-secondary rounded-xl w-full max-w-[250px]">
        <Heading className="capitalize px-6 pt-5 text-lg" type="semibold">
          {sourceData?.table}
        </Heading>
        <Divider />
        <div className="mx-4 relative">
          <Button
            btnName="Upload File"
            variant="secondary"
            icon={<LuUpload size={18} />}
            fullWidth
          />
          <input
            type="file"
            className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="p-3 space-y-6">
          {sourceData?.fields?.map((item, idx) => (
            <div key={idx}>{item?.name}</div>
          ))}
        </div>
      </div>
      <div className="w-full space-y-6">
        <Table
          title="All Items"
          headings={data}
          data={tableData}
          ids={masterData?.fields?.map((item) => item?.name) || []}
          className="overflow-y-scroll max-h-[calc(100vh-300px)]"
        />
        <div className="flex justify-center gap-x-4">
          <Button
            btnName="Preview Transformations"
            icon={<LuEye size={18} />}
            iconFirst
          />
          <Button
            btnName="Save Transformations"
            icon={<LuSave size={18} />}
            iconFirst
          />
          <Button btnName="Apply Transformations" variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default Page;

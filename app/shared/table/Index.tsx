"use client";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { format } from "url";
import Button from "../buttons/Button";
import Checkbox from "../checkbox";
import Heading from "../heading";
import Pagination from "../pagination/Pagination";
import { IParams, ITableHeading } from "../types";

export interface ITable {
  headings: ITableHeading[];
  data: IData;
  ids: string[] | null;
  title: string;
  enableSelection?: boolean;
  onRowClick?: (id: string) => void;
  className?: string;
}
interface IData {
  [key: string]: any[];
}
const Table = ({
  headings,
  data,
  ids,
  title,
  enableSelection,
  onRowClick,
  className,
}: ITable) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const [page, setPage] = useState(Number(params?.page) || 1);
  const formattedData = ids?.slice((page - 1) * 10, page * 10);
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(100);
  useEffect(() => {
    setWidth(Number(ref.current?.offsetWidth));
  }, [ids]);

  return (
    <div className="border border-secondary rounded-xl bg-white">
      <Heading className="px-6 py-5 bg-white rounded-t-xl !text-lg">
        {title}
      </Heading>

      <Fragment>
        <div className={clsx("overflow-x-scroll h-full", className)}>
          <table className="w-full">
            <thead className="top-0 sticky z-10 bg-white border-y border-y-secondary">
              <tr
                className={clsx(
                  "[&>*]:text-xs bg-secondary [&>*]:text-start [&>*]:font-medium [&>*]:py-3 [&>*]:px-6 [&>*]:text-tertiary",
                  enableSelection && "[&>*:first-child]:pr-0"
                )}
              >
                {enableSelection && (
                  <Checkbox
                    checked={false}
                    name="table"
                    onChange={() => {}}
                    className="w-max bg-secondary"
                  />
                )}
                {headings?.map((item, idx) => (
                  <th
                    key={idx}
                    className={clsx(
                      headings?.[idx]?.variant === "actions" && "!text-center"
                    )}
                  >
                    {item?.title}
                    {item?.icon}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formattedData?.map((id, idx) => (
                <tr
                  onClick={() => onRowClick?.(id)}
                  key={id}
                  className={clsx(
                    "[&>*]:px-6 [&>*]:py-4",
                    idx !== formattedData?.length - 1 &&
                      "border-b border-secondary",
                    enableSelection && "[&>*:first-child]:pr-0",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {enableSelection && (
                    <td className="w-5">
                      <Checkbox
                        checked={false}
                        name="table"
                        onChange={() => {}}
                        className="w-max bg-secondary"
                      />
                    </td>
                  )}
                  {Object.keys(data)?.map((item, idx1) => {
                    const elem = data?.[item as keyof IParams];
                    const row = (page - 1) * 10 + idx;
                    return (
                      <td
                        key={idx1}
                        className={clsx("max-w-[330px]")}
                        style={{
                          width:
                            headings?.[idx1]?.variant === "actions"
                              ? `${width}px`
                              : "fit-content",
                        }}
                      >
                        {headings?.[idx1]?.variant === "text" ? (
                          <div className="text-tertiary text-sm">
                            {elem?.[row]}
                          </div>
                        ) : headings?.[idx1]?.variant === "actions" ? (
                          <div
                            ref={ref}
                            className={clsx(
                              "flex gap-x-1 items-center justify-center"
                            )}
                          >
                            {Array.isArray(elem?.[row])
                              ? elem?.[row]?.map((e: any) => (
                                  <Button
                                    key={e}
                                    className="!p-2 !border-none"
                                    variant="secondary"
                                    onClick={(event) => {
                                      event?.stopPropagation();
                                      e?.onClick(id);
                                    }}
                                  />
                                ))
                              : elem?.[row]}
                          </div>
                        ) : (
                          elem?.[row]
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
      <div className="flex justify-between border-t border-secondary items-center px-6 py-3">
        <Pagination
          page={page}
          totalPages={Math.ceil((ids?.length ?? 0) / 10)}
          active={({ selected }: { selected: number }) => {
            router.push(
              format({
                pathname,
                query: { page: `${selected + 1}` },
              }),
              {
                scroll: false,
              }
            );
            setPage(selected + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Table;

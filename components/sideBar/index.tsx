"use client";
import Button from "@/app/shared/buttons/Button";
import CardWrapper from "@/app/shared/cards/CardWrapper";
import DownloadApp from "@/app/shared/cards/DownloadApp";
import UserCard from "@/app/shared/cards/UserCard";
import Divider from "@/app/shared/divider";
import Heading from "@/app/shared/heading";
import Img from "@/app/shared/Img";
import { removeCookie } from "@/app/utils/Cookies";
import useWindowDimensions from "@/app/utils/hooks/useWindowDimension";
import { drawerItems } from "@/app/utils/static";
import { SvgCross } from "@/public/svgs";
import { tw } from "@/tailwind.config";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";

const SideBar = ({
  className,
  close,
}: {
  className?: string;
  close?: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = pathname.split("/")?.splice(1);
  const checkIfMenuItems = () =>
    Boolean(drawerItems.find((e) => e.key === routes?.[0])?.menuItems);
  const [showItems, setShowItems] = useState(
    routes.length > 1 ? checkIfMenuItems : false
  );
  useEffect(() => {
    routes.length === 1 && setShowItems(false);
  }, [pathname]);
  const { width } = useWindowDimensions();
  return (
    <CardWrapper
      className={clsx(
        "md:py-6 py-4 px-0 space-y-4 w-full max-w-[312px] my-auto lg:h-[calc(100vh-64px)] md:h-[calc(100vh-32px)] h-full flex flex-col",
        className
      )}
    >
      <div className="flex justify-between items-center px-6">
        <Link href="/home" className="flex items-center gap-x-2">
          <Img
            height={32}
            width={47}
            alt=""
            src="/images/temp/magnumLogo.png"
            className="max-h-8"
            isLocal
          />
          <Heading
            type="semibold"
            className="text-xl line-clamp-1"
            variant="primary"
          >
            Magnum Global Park
          </Heading>
        </Link>
        {Number(width) <= 768 && (
          <SvgCross
            height={26}
            width={26}
            onClick={close}
            stroke="black"
            className="cursor-pointer"
          />
        )}
      </div>
      <Divider />
      <div className="space-y-2 px-4 overflow-y-scroll">
        {drawerItems.map((item, idx) => (
          <Fragment key={idx}>
            <Button
              key={idx}
              btnName={item?.title}
              variant={
                !item?.menuItems && pathname.includes(item.key)
                  ? "tertiary-color"
                  : "tertiary"
              }
              icon={item?.icon(
                !item?.menuItems && pathname.includes(item.key)
                  ? tw?.textColor["brand-secondary"]
                  : item.disabled
                    ? tw?.textColor["disabled"]
                    : ""
              )}
              iconFirst
              fullWidth
              className={clsx(
                "!justify-start !gap-x-3",
                !item?.menuItems &&
                  pathname.includes(item.key) &&
                  "!text-brand-secondary bg-btn-tertiary-hover"
              )}
              onClick={
                item?.menuItems
                  ? () => setShowItems(!showItems)
                  : () => {
                      close?.();
                      router.push(`/${item.key}`);
                    }
              }
              disabled={item?.disabled}
              secondaryIcon={
                item?.menuItems && (
                  <IoIosArrowDown
                    size={14}
                    className={clsx(
                      "order-last ml-auto duration-300",
                      showItems && "rotate-180"
                    )}
                  />
                )
              }
            />
            {showItems && (
              <div className="space-y-1">
                {item?.menuItems?.map((item1, idx1) => (
                  <Button
                    key={idx1}
                    btnName={item1.title}
                    variant={
                      pathname.includes(item1.key)
                        ? "tertiary-color"
                        : "tertiary"
                    }
                    fullWidth
                    className={clsx(
                      "!justify-start animate-slide !pl-[50px]",
                      pathname.includes(item1.key) &&
                        "!text-brand-secondary bg-btn-tertiary-hover"
                    )}
                    onClick={() => {
                      close?.();
                      router.push(`/${item.key}/${item1.key}`);
                    }}
                    // disabled={item1.disabled}
                  />
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="space-y-4 !mt-auto pt-4">
        <Divider />
        <DownloadApp />
        <UserCard
          title="Suryansh"
          subtitle="Aeria"
          image="/images/temp/magnumBg.png"
          className="px-6"
          onClick={() => {
            removeCookie("token");
            router.push("/auth/login");
          }}
        >
          <TiArrowSortedDown
            size={16}
            className="text-quaternary ml-auto cursor-pointer"
          />
        </UserCard>
      </div>
    </CardWrapper>
  );
};

export default SideBar;

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useState } from "react";
import ErrorBoundary from "./errorBoundary";
import { GlobalContext } from "../contexts";

const queryClient = new QueryClient();
const ReactQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<{ [key: string]: string }>({});
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GlobalContext.Provider value={{ data, setData }}>
          {children}
        </GlobalContext.Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default ReactQueryClientProvider;

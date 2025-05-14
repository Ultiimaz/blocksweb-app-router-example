"use client";
import { settings } from "@/blocksweb.config";
import { DynamicRenderer } from "@blocksweb/core/client";
import { BlockswebProvider, IBlockswebComponent } from "@blocksweb/core/editor";
import { BlockswebPage } from "@blocksweb/core/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const PageClient = (page: BlockswebPage) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BlockswebProvider settings={settings}>
        <DynamicRenderer
          page={page}
          editorComponents={settings.editorComponents as IBlockswebComponent[]}
          locale={"NL"}
        />
      </BlockswebProvider>
    </QueryClientProvider>
  );
};

export default PageClient;

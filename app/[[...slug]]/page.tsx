import { getServerPage } from "@blocksweb/core/server";
import PageClient from "./page.client";

type HomeProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Home({ params }: HomeProps) {
  let slug = (await params)?.slug?.join("/");

  if (!slug) {
    slug = "index";
  }
  const page = await getServerPage(slug);

  return <PageClient {...page} />;
}

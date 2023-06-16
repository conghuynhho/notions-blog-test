import {fetchPageBySlug, fetchPageBlocks, notion} from '@/lib/notion'
import {notFound} from "next/navigation";
import {NotionRenderer} from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPageBySlug(params.slug);
  if (!post) notFound();


  const blocks = await fetchPageBlocks(post.id);
  console.log("🚀 ~ file: page.tsx:16 ~ Page ~ blocks:", blocks)
  blocks.forEach(block => {
    // console.log("🚀 ~ file: page.tsx:16 ~ Page ~ block:", block?.paragraph?.rich_text)
  })



  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...blocks)

  return <div className="notion-render" dangerouslySetInnerHTML={{ __html: html }}></div>
}

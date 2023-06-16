import {fetchPageBySlug, fetchPageBlocks, notion, fetchPageMarkdown} from '@/lib/notion'
import {notFound} from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPageBySlug(params.slug);
  if (!post) notFound();


  const mdStringsObject = await fetchPageMarkdown(post.id);
  const mdStrings = Object.values(mdStringsObject)[0] || 'No markdown found'
  console.log('==========mdString===========', mdStringsObject)
  console.log('==========typeof===========', typeof mdStringsObject)
  return (
    <div>
      <ReactMarkdown>
        {mdStrings}
      </ReactMarkdown>
    </div>
  )
}

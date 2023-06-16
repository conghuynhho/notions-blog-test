import 'server-only'
import {cache} from 'react'
import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  BlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import {NotionToMarkdown} from "notion-to-md";

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID
const NOTION_TOKEN = process.env.NOTION_TOKEN

// notion instance
export const notion = new Client({
  auth: NOTION_TOKEN
})

export const n2m = new NotionToMarkdown({
  notionClient: notion
})

const fetchPages = cache(() => {
  return notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published'
      }
    }
  })
})

export const fetchPageBySlug = cache((slug: string) => {
  return notion.databases
    .query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined)
    .catch((e) => console.log(e));
})


export const fetchPageBlocks = cache((pageId: string) => {
  return notion.blocks.children
    .list({block_id: pageId})
    .then(res => {
      // console.log("🚀 ~ file: notion.ts:53 ~ fetchPageBlocks ~ res:", res)
      return res.results as BlockObjectResponse[]
    })
})

export const fetchPageMarkdown = cache(async (pageId: string) => {
  const mdBlocks = await n2m.pageToMarkdown(pageId)
  const mdStrings = n2m.toMarkdownString(mdBlocks)
  return mdStrings
})

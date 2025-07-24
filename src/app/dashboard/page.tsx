
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { headers } from "next/headers";
export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

type course = {
  id: string
  name: string
  Description: string
  createdAt: Date
}

export default async function Page() {
  const response= await fetch(
    "http://localhost:3000/api/course",
    {
      headers: await headers()
    }
  )
  const {courses} = await response.json()



  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
<div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Enrollments</h1>
                <span className="text-sm text-muted-foreground">
                  {courses?.length} courses available
                </span>
              </div>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
               
                <div className="bg-muted/50 aspect-video rounded-xl" />
              {
                  courses?.map((c:course) => (
                    <div
                      key={c.id}
                      className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-lg font-semibold">{c.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {c.Description}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        Created at: {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                }
                <div className="bg-muted/50 aspect-video rounded-xl" />
                
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

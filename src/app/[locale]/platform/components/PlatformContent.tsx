"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"

interface PlatformContentProps extends React.ComponentProps<"main"> {
  // ❌ Eliminado: organizationId ya no se necesita
}

export const PlatformContent = React.forwardRef<HTMLDivElement, PlatformContentProps>(
  ({ className, children, ...props }, ref) => {
    const { state } = useSidebar()

    return (
      <main
        ref={ref}
        className={cn(
          "flex-1 flex flex-col transition-[margin-left] duration-200 ease-linear",
          state === "expanded" ? "ml-[var(--sidebar-width)]" : "ml-[var(--sidebar-width-icon)]",
          "md:ml-[var(--sidebar-width-icon)] group-data-[state=expanded]/sidebar-wrapper:md:ml-[var(--sidebar-width)]",
          "p-4 md:p-6",
          className,
        )}
        {...props}
      >
        {children}
      </main>
    )
  },
)

PlatformContent.displayName = "PlatformContent"

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";

export interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemData[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="min-w-0">
      <BreadcrumbList className="min-w-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className={isLast ? "min-w-0" : "shrink-0"}>
                {isLast ?
                  (
                    <BreadcrumbPage className="truncate">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      render={(props) => (
                        <Link {...props} href={item.href || "#"}>
                          {item.label}
                        </Link>
                      )}
                    />
                  )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="shrink-0" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}


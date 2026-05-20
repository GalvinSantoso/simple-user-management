import {
  Breadcrumb as BreadcrumbContainer,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface BreadcrumbProps {
  items: {
    name: string;
    link: string;
  }[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList className="text-sm">
        {items.map(({ name, link }, i) => {
          const isLastItem = i == items.length - 1;
          return (
            <div className="flex items-center gap-1.5" key={name}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage className="text-primary font-semibold">{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={link}>{name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;

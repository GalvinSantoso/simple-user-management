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
            <BreadcrumbItem key={name}>
              {isLastItem ? (
                <BreadcrumbPage className="text-primary font-semibold">{name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={link}>{name}</BreadcrumbLink>
              )}
              {!isLastItem && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;

interface TypographyListProps {
  items: string[];
}

export default function TypographyList({ items }: TypographyListProps) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

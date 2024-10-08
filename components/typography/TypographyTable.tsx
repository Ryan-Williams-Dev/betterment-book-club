interface TypographyTableProps {
  headers: string[];
  rows: string[][];
}

export default function TypographyTable({
  headers,
  rows,
}: TypographyTableProps) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="m-0 border-t p-0 even:bg-muted">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Usage example below

// import { TypographyTable } from './TypographyTable';

// const headers = ["King's Treasury", "People's happiness"];
// const rows = [
//   ["Empty", "Overflowing"],
//   ["Modest", "Satisfied"],
//   ["Full", "Ecstatic"]
// ];

// const MyComponent = () => (
//   <div>
//     <TypographyTable headers={headers} rows={rows} />
//   </div>
// );

// export default MyComponent;

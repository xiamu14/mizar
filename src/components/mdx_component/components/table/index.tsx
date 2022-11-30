import { createMarkdownArrayTable } from 'parse-markdown-table';
import { PropsWithChildren, useEffect, useState } from 'react';
import styles from './index.module.scss';

const Table = ({ children }: PropsWithChildren<{}>) => {
  const [table, setTable] = useState<{
    headers: readonly string[];
    rows: (readonly string[])[];
  }>();

  useEffect(() => {
    createMarkdownArrayTable(children as string).then(async (data: any) => {
      const rows: (readonly string[])[] = [];

      for await (const row of data.rows) {
        rows.push(row);
      }
      setTable({ headers: data.headers, rows });
    });
  }, [children]);

  if (!table) return null;
  return (
    <div>
      <table className={`${styles['table']}`} style={{ tableLayout: 'auto' }}>
        <thead className={`${styles['thead']}`}>
          <tr className={`${styles['tr']}`}>
            {table.headers.map((item, index) => {
              return (
                <th className={`${styles['thead-th']}`} key={`th-${index}`}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, index) => {
            return (
              <tr key={`tr-${index}`}>
                {row.map((item, index) => {
                  return (
                    <td className={`${styles['tbody-td']}`} key={`td-${index}`}>
                      {item}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

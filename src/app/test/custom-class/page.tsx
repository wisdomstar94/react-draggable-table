"use client"
import { DraggableTableWrapper } from "@/components/draggable-table-wrapper/draggable-table-wrapper.component";
import { useCallback, useEffect, useState } from "react";
import styles from './page.module.css';

export default function Page() {
  const [data, setData] = useState<Array<Array<number>>>();

  const onColTitleClick = useCallback((index: number) => {
    setData(prev => {
      if (prev === undefined) return undefined;
      const originalValue = prev.at(0)?.at(index) ?? 0;
      const newValue = originalValue === 0 ? 1 : 0;
      return prev.map(row => {
        const newRow = [...row];
        newRow[index] = newValue;
        return newRow;
      });
    });
  }, []);

  const onRowTitleClick = useCallback((index: number) => {
    setData(prev => {
      if (prev === undefined) return undefined;
      const originalValue = prev.at(index)?.at(0) ?? 0;
      const newValue = originalValue === 0 ? 1 : 0;
      return prev.map((row, rowIndex) => {
        const newRow = [...row];
        if (rowIndex !== index) {
          return newRow;
        }
        return newRow.map(k => newValue);
      });
    });
  }, []);

  const onToalToggleClick = useCallback(() => {
    setData(prev => {
      if (prev === undefined) return undefined;
      const originalValue = prev.at(0)?.at(0) ?? 0;
      const newValue = originalValue === 0 ? 1 : 0;
      return prev.map((row, rowIndex) => {
        const newRow = [...row];
        return newRow.map(k => newValue);
      });
    });
  }, []);

  useEffect(() => {
    setData(Array.from({ length: 24 }).map(_ => Array.from({ length: 7 }).map(_ => 0)));
  }, []);

  useEffect(() => {
    console.log('@@@@@@data', data);
  }, [data]);

  return (
    <>
      <DraggableTableWrapper 
        className="relative w-[400px]"
        dragAreaClassName={styles['drag-area']}
        cellActiveClassName={styles['cell-active']}
        data={data}
        onChange={(newData) => {
          // 바뀐 데이터로 반영을 원할 시
          setData(newData);

          // 바뀐 데이터로 반영을 원하지 않을 시
          // setData([...(data ?? [])]);
        }}>
        <table className="w-full border-t border-t-slate-400 border-l border-l-slate-400">
          <thead>
            <tr>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onToalToggleClick()}>
                &nbsp;
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onColTitleClick(0)}>
                a
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onColTitleClick(1)}>
                b
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onColTitleClick(2)}>
                c
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onColTitleClick(3)}>
                d
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onColTitleClick(4)}>
                e
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onColTitleClick(5)}>
                f
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onColTitleClick(6)}>
                g
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((row, index) => {
                return (
                  <tr key={`row_${index}`}>
                    <th className="border-b border-b-slate-400 border-r border-r-slate-400" onClick={() => onRowTitleClick(index)}>
                      { index.toString().padStart(2, '0') }
                    </th>
                    {
                      row.map((item, itemIndex) => {
                        return (
                          <td 
                            key={`row_${index}_td_${itemIndex}`} 
                            className="border-b border-b-slate-400 border-r border-r-slate-400"
                            data-draggable={true}>

                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </DraggableTableWrapper>

      <div>
        <button
          onClick={() => {
            setData([
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0],
              [1, 1, 1, 1, 1, 1, 0],
              [1, 1, 0, 0, 0, 0, 0],
            ])
          }}>부모에서 데이터 임의로 바꾸기</button>
      </div>

      <div className="w-full h-[600px] bg-blue-300">

      </div>
    </>
  );
}
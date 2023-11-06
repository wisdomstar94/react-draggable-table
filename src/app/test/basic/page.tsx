"use client"
import { DraggableTableWrapper } from "@/components/draggable-table-wrapper/draggable-table-wrapper.component";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<Array<Array<number>>>();

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
              <th className="border-b border-b-slate-400 border-r border-r-slate-400">
                &nbsp;
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400">
                a
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400">
                b
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400">
                c
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400">
                d
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400">
                e
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400">
                f
              </th>
              <th className="border-b border-b-slate-400 border-r border-r-slate-400">
                g
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((row, index) => {
                return (
                  <tr key={`row_${index}`}>
                    <th className="border-b border-b-slate-400 border-r border-r-slate-400">
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
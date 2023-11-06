import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { IDraggableTableWrapper } from "./draggable-table-wrapper.interface";
import { useAddEventListener } from '@wisdomstar94/react-add-event-listener';
import { useCursorEventCalculator } from '@wisdomstar94/react-cursor-event-calculator';
import styles from './draggable-table-wrapper.module.css';
import { createPortal } from "react-dom";

export function DraggableTableWrapper(props: IDraggableTableWrapper.Props) {
  const {
    className,
    children,
    data,
    onChange,
  } = props;

  const [renderData, setRenderData] = useState(data);
  const dragAreaClassName = useMemo(() => props.dragAreaClassName ?? styles['default-drag-area-style'], [props.dragAreaClassName]);
  const cellActiveClassName = useMemo(() => props.cellActiveClassName ?? styles['default-cell-active-style'], [props.cellActiveClassName]);
  const cellActiveClassNames = useMemo(() => cellActiveClassName.split(' '), [cellActiveClassName]);
  const dragAreaMargin = useMemo(() => props.dragAreaMargin ?? 2, [props.dragAreaMargin]);
  const divRef = useRef<HTMLDivElement>(null);
  const cursorEventCalculator = useCursorEventCalculator({
    dragAreaMargin,
  });
  const id = useId();
  const tableWrapperId = `${id}-table-wrapper`;

  const onCursorPress = useCallback((event: { mouseEvent?: MouseEvent; touchEvent?: TouchEvent;}) => {
    const thisTable = cursorEventCalculator.getElementFromEvent(event, {
      requiredKeyValueItems: [
        { key: 'id', value: tableWrapperId, checkType: 'full-match' },
      ],
      requiredKeyValueItemsCheckType: 'and',
    });
    if (thisTable === undefined) return;

    cursorEventCalculator.setPress(divRef.current, event);
  }, [cursorEventCalculator, tableWrapperId]);

  const onCursorMoving = useCallback((event: { mouseEvent?: MouseEvent; touchEvent?: TouchEvent;}) => {
    cursorEventCalculator.setMoving(event);
  }, [cursorEventCalculator]);

  const onCursorEnd = useCallback((event: { mouseEvent?: MouseEvent; touchEvent?: TouchEvent;}) => {
    cursorEventCalculator.setEnd(event);
  }, [cursorEventCalculator]);

  const mouseDownCallback = useCallback((event: MouseEvent) => {
    onCursorPress({ mouseEvent: event });
  }, [onCursorPress]);

  const touchStartCallback = useCallback((event: TouchEvent) => {
    onCursorPress({ touchEvent: event });
  }, [onCursorPress]);

  const mouseMoveCallback = useCallback((event: MouseEvent) => {
    onCursorMoving({ mouseEvent: event });
  }, [onCursorMoving]);

  const touchMoveCallback = useCallback((event: TouchEvent) => {
    onCursorMoving({ touchEvent: event });
  }, [onCursorMoving]);

  const mouseUpCallback = useCallback((event: MouseEvent) => {
    onCursorEnd({ mouseEvent: event });
  }, [onCursorEnd]);

  const touchEndCallback = useCallback((event: TouchEvent) => {
    onCursorEnd({ touchEvent: event });
  }, [onCursorEnd]);

  const getTable = useCallback(() => {
    return document.getElementById(tableWrapperId)?.querySelector('table');
  }, [tableWrapperId]);

  const colActiveCheck = useCallback((targetData: IDraggableTableWrapper.Data | undefined) => {
    const table = getTable();
    if (table === null) return;
    if (table === undefined) return;

    const trs = table.querySelectorAll<HTMLElement>('tbody > tr');
    if (trs === null) return;

    targetData?.forEach((row, rowIndex) => {
      const tr = trs[rowIndex];
      const tds: HTMLElement[] = [];
      for (let k = 0; k < tr.children.length; k++) {
        const child = tr.children[k] as HTMLElement;
        // console.log('@child', { child });
        const nodeName = child.nodeName.toLowerCase(); // ex) th, td ...
        if (nodeName !== 'td') {
          continue;
        }
        tds.push(child);
      }

      row.forEach((col, colIndex) => {
        if (col === 0) {
          cellActiveClassNames.forEach(className => {
            if (className.trim() === '') return;
            tds[colIndex].classList.remove(className);
          });
        } else {
          cellActiveClassNames.forEach(className => {
            if (className.trim() === '') return;
            tds[colIndex].classList.add(className);
          });
        }
      });
    });
  }, [cellActiveClassNames, getTable]);

  useAddEventListener({
    windowEventRequiredInfo: {
      eventName: 'mousedown',
      eventListener: mouseDownCallback,
    },
  });

  useAddEventListener({
    windowEventRequiredInfo: {
      eventName: 'touchstart',
      eventListener: touchStartCallback,
    },
  });

  useAddEventListener({
    windowEventRequiredInfo: {
      eventName: 'mousemove',
      eventListener: mouseMoveCallback,
    },
  });

  useAddEventListener({
    windowEventRequiredInfo: {
      eventName: 'touchmove',
      eventListener: touchMoveCallback,
    },
  });

  useAddEventListener({
    windowEventRequiredInfo: {
      eventName: 'mouseup',
      eventListener: mouseUpCallback,
    },
  });

  useAddEventListener({
    windowEventRequiredInfo: {
      eventName: 'touchend',
      eventListener: touchEndCallback,
    },
  });

  useEffect(() => {
    setRenderData(data);
  }, [data]);

  useEffect(() => {
    if (cursorEventCalculator.isPressing !== true) return;
    if (cursorEventCalculator.dragAreaInfo === undefined) return;

    const table = getTable();
    if (table === null) return;
    if (table === undefined) return;

    const _renderData: Array<Array<number>> = [];
    const trs = table.querySelectorAll<HTMLElement>('tbody > tr');
    trs.forEach((tr, rowIndex) => {
      // console.log(`tr`, tr);
      _renderData.push([]);
      const tds: HTMLElement[] = [];
      for (let k = 0; k < tr.children.length; k++) {
        const child = tr.children[k] as HTMLElement;
        // console.log('@child', { child });
        const nodeName = child.nodeName.toLowerCase(); // ex) th, td ...
        if (nodeName !== 'td') {
          continue;
        }
        tds.push(child);
      }

      for (let i = 0; i < tds.length; i++) {
        const child = tds[i];
        // console.log('@child', { child });
        const nodeName = child.nodeName.toLowerCase(); // ex) th, td ...
        if (nodeName !== 'td') {
          continue;
        }

        const propsDataUnit = data?.at(rowIndex)?.at(i) ?? 0;
        // console.log(`[${rowIndex}][${i}]`, propsDataUnit);

        if (cursorEventCalculator.isIncludeElementTargetSquare(child)) {
          _renderData[rowIndex].push(propsDataUnit === 0 ? 1 : 0);
        } else {
          _renderData[rowIndex].push(propsDataUnit);
        }
      }
    });
    setRenderData(_renderData);
    // if (typeof onChange === 'function') onChange(_renderData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorEventCalculator.isPressing, cursorEventCalculator.dragAreaInfo]);

  useEffect(() => {
    // console.log('@renderData', renderData);
    colActiveCheck(renderData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderData]);

  useEffect(() => {
    colActiveCheck(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // useEffect(() => {
  //   if (cursorEventCalculator.isPressing) {
  //     body.denyTextDrag();
  //   } else {
  //     body.allowTextDrag();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cursorEventCalculator.isPressing]);

  useEffect(() => {
    if (cursorEventCalculator.dragEndEvent === undefined) return;
    if (typeof onChange === 'function') onChange(renderData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorEventCalculator.dragEndEvent]);

  return (
    <>
      <div
        id={tableWrapperId}
        ref={divRef}
        className={className}
        >
        { children }
      </div>

      {
        typeof document !== 'undefined' ? 
        createPortal(
          <>
            {
              cursorEventCalculator.isPressing ? 
              <div
                className={dragAreaClassName}
                style={{
                  width: cursorEventCalculator.dragAreaInfo?.width,
                  height: cursorEventCalculator.dragAreaInfo?.height,
                  top: cursorEventCalculator.dragAreaInfo?.top,
                  left: cursorEventCalculator.dragAreaInfo?.left,
                  position: 'fixed',
                }} />
              :
              null
            }
          </>, 
          document.body,
        )
        : 
        null
      }
    </>
  );
}
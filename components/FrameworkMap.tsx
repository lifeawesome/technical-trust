"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  cellAccessibleName,
  cellReadingIndex,
  cellTagLabel,
  columns,
  getCell,
  isPublished,
  rows,
  type FrameworkCell,
  type FrameworkColumn,
  type FrameworkRow,
  type FrameworkView,
} from "@/lib/framework";
import { isExternalUrl } from "@/lib/patterns";
import styles from "./FrameworkMap.module.css";

function statusClass(status: FrameworkCell["status"]): string {
  switch (status) {
    case "pattern":
      return styles.cellPattern;
    case "field-guide":
      return styles.cellFieldGuide;
    case "chapter":
      return styles.cellChapter;
    case "planned":
      return styles.cellPlanned;
    case "predicted":
      return styles.cellPredicted;
    default:
      return styles.cellOpen;
  }
}

function CellBody({ cell }: { cell: FrameworkCell }) {
  const tag = cellTagLabel(cell);
  return (
    <>
      {tag ? <span className={`${styles.statusTag} mono`}>{tag}</span> : null}
      {cell.title ? <span className={styles.cellTitle}>{cell.title}</span> : null}
      {cell.note ? <span className={styles.cellNote}>{cell.note}</span> : null}
    </>
  );
}

function CellContent({
  cell,
  row,
  col,
  view,
  reducedMotion,
  flipIndex,
}: {
  cell: FrameworkCell;
  row: FrameworkRow;
  col: FrameworkColumn;
  view: FrameworkView;
  reducedMotion: boolean | null;
  flipIndex: number;
}) {
  const name = cellAccessibleName(cell, row, col, view);
  const className = `${styles.cellInner} ${statusClass(cell.status)}`;
  const linkProps =
    cell.slug && isExternalUrl(cell.slug)
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

  let content: React.ReactNode;

  if (isPublished(cell.status) && cell.slug) {
    const body = <CellBody cell={cell} />;
    if (reducedMotion) {
      content = (
        <Link
          href={cell.slug}
          className={className}
          aria-label={name}
          {...linkProps}
        >
          {body}
        </Link>
      );
    } else if (view === "patterns") {
      content = (
        <motion.div
          className={styles.publishedWrap}
          initial={false}
          whileInView={{
            boxShadow: [
              "0 0 0 0 rgba(245, 158, 11, 0)",
              "0 0 0 3px rgba(245, 158, 11, 0.35)",
              "0 0 0 0 rgba(245, 158, 11, 0)",
            ],
          }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <Link
            href={cell.slug}
            className={className}
            aria-label={name}
            {...linkProps}
          >
            {body}
          </Link>
        </motion.div>
      );
    } else {
      content = (
        <Link
          href={cell.slug}
          className={className}
          aria-label={name}
          {...linkProps}
        >
          {body}
        </Link>
      );
    }
  } else if (cell.status === "planned") {
    const body = <CellBody cell={cell} />;
    content = cell.slug ? (
      <Link
        href={cell.slug}
        className={className}
        aria-label={name}
        {...linkProps}
      >
        {body}
      </Link>
    ) : (
      <div className={className} aria-label={name}>
        {body}
      </div>
    );
  } else if (cell.status === "predicted") {
    content = (
      <div className={className} aria-label={name}>
        <CellBody cell={cell} />
      </div>
    );
  } else {
    content = <div className={className} aria-label={name} />;
  }

  if (reducedMotion) {
    return <div className={styles.flipSlot}>{content}</div>;
  }

  return (
    <motion.div
      key={`${view}-${cell.rowId}-${cell.colId}`}
      className={styles.flipSlot}
      initial={{ opacity: 0, rotateX: 12 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
        delay: flipIndex * 0.03,
      }}
      style={{ transformPerspective: 900 }}
    >
      {content}
    </motion.div>
  );
}

function DesktopMap({
  view,
  reducedMotion,
}: {
  view: FrameworkView;
  reducedMotion: boolean | null;
}) {
  return (
    <div
      className={styles.desktop}
      role="region"
      aria-label={
        view === "practices" ? "Practices framework map" : "Patterns framework map"
      }
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.corner}>
              <span className="sr-only">Component</span>
            </th>
            {columns.map((col) => (
              <th key={col.id} scope="col" className={`${styles.colHeader} mono`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const cells = columns.map((col) => ({
              col,
              cell: getCell(row.id, col.id, view),
            }));

            const rowContent = (
              <>
                <th scope="row" className={styles.rowHeader}>
                  <span className={styles.rowLabel}>{row.label}</span>
                  <span className={styles.rowLine}>{row.line}</span>
                </th>
                {cells.map(({ col, cell }) => (
                  <td key={col.id} className={styles.td}>
                    <CellContent
                      cell={cell}
                      row={row}
                      col={col}
                      view={view}
                      reducedMotion={reducedMotion}
                      flipIndex={cellReadingIndex(row.id, col.id)}
                    />
                  </td>
                ))}
              </>
            );

            if (reducedMotion) {
              return <tr key={row.id}>{rowContent}</tr>;
            }

            return (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: rowIndex * 0.08,
                }}
              >
                {rowContent}
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MobileRowSection({
  row,
  rowIndex,
  view,
  reducedMotion,
}: {
  row: FrameworkRow;
  rowIndex: number;
  view: FrameworkView;
  reducedMotion: boolean | null;
}) {
  const filled: { col: FrameworkColumn; cell: FrameworkCell }[] = [];
  const ghostNames: string[] = [];

  for (const col of columns) {
    const cell = getCell(row.id, col.id, view);
    if (cell.status === "predicted") {
      if (cell.title) ghostNames.push(cell.title);
    } else if (cell.status !== "open") {
      filled.push({ col, cell });
    }
  }

  const header = (
    <header className={styles.mobileHeader}>
      <h3 className={styles.rowLabel}>{row.label}</h3>
      <p className={styles.rowLine}>{row.line}</p>
    </header>
  );

  const body = (
    <ul className={styles.mobileList}>
      {filled.map(({ col, cell }) => (
        <li key={col.id} className={styles.mobileItem}>
          <span className={`${styles.momentLabel} mono`}>{col.label}</span>
          <CellContent
            cell={cell}
            row={row}
            col={col}
            view={view}
            reducedMotion={reducedMotion}
            flipIndex={cellReadingIndex(row.id, col.id)}
          />
        </li>
      ))}
      {ghostNames.length > 0 ? (
        <li className={styles.mobilePredicted}>
          <span className={styles.mobilePredictedText}>
            Unwritten: {ghostNames.join(" · ")}
          </span>
        </li>
      ) : null}
    </ul>
  );

  if (reducedMotion) {
    return (
      <section className={styles.mobileSection} aria-labelledby={`row-${row.id}`}>
        <div id={`row-${row.id}`}>{header}</div>
        {body}
      </section>
    );
  }

  return (
    <motion.section
      className={styles.mobileSection}
      aria-labelledby={`row-${row.id}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: rowIndex * 0.08,
      }}
    >
      <div id={`row-${row.id}`}>{header}</div>
      {body}
    </motion.section>
  );
}

type FrameworkMapProps = {
  view: FrameworkView;
};

export default function FrameworkMap({ view }: FrameworkMapProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.map}>
      <DesktopMap view={view} reducedMotion={reducedMotion} />
      <div
        className={styles.mobile}
        role="region"
        aria-label={
          view === "practices"
            ? "Practices framework map"
            : "Patterns framework map"
        }
      >
        {rows.map((row, i) => (
          <MobileRowSection
            key={row.id}
            row={row}
            rowIndex={i}
            view={view}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </div>
  );
}

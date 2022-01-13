import { Section } from "../module/responseSection";

export type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

export const arrayUniqueSection = (rows: Section[]) =>
  rows.reduce(
    (acc, { S_name, id, workspace_name }) =>
      !acc.some(({ name, id: idE }) => name === S_name && id === idE)
        ? [...acc, { name: S_name, id, workSpaceName: workspace_name }]
        : acc,
    [] as { name: string; id: number; workSpaceName: string }[]
  );

export const formattedSections = (
  nameSections: { name: string; id: number; workSpaceName: string }[],
  rows: Section[]
) =>
  nameSections.map((element) => ({
    ...element,
    tasks: rows
      .filter(
        (row) =>
          row.id === element.id &&
          element.name === row.S_name &&
          row.T_id !== null
      )
      .map(({ content, T_id, section_id, date, priority, done }) => ({
        content,
        T_id,
        section_id,
        date,
        priority,
        done,
      })),
  }));

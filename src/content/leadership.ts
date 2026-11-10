/**
 * Leadership profiles. Add real people only, with their written approval of the
 * name, title, photograph and biography. While the list is empty, the Leadership
 * page explains that profiles are coming and links to governance instead.
 */
export type Leader = {
  name: string;
  title: string;
  bio: string[];
  /** Professional credentials the person really holds, for example "CPA (Texas)". */
  credentials?: string[];
  linkedin?: string;
};

export const leaders: Leader[] = []; // LAUNCH-PLACEHOLDER: add confirmed leadership profiles, or remove the Leadership page from navigation

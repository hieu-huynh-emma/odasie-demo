// types/index.ts (or wherever your types live)
type IconName = 'skull' | 'circle-x' | 'shield-plus' | 'activity' | string; // Add other names

// Assuming BaseSection has common properties like __component, id etc.
export type BaseSection = {
  __component: string;
  id: number;
  // ... other common properties if any
};

export interface IconData {
  id: number;
  name: IconName; // Use your actual icon name type
  size: number;
  color: string | null;
}

export interface TableHeadingColumn {
  id: number;
  text: string;
}

export interface TableRowCheck {
  id: number;
  included: boolean | null; // Use boolean | null based on your data
}

export interface TableRow {
  id: number;
  title: string | null;
  description: string;
  expandAllColumns: boolean;
  icon: IconData;
  checks: TableRowCheck[];
}

export interface TableFooterColumn {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

export interface TableData {
  id: number;
  headingColumns: TableHeadingColumn[];
  rows: TableRow[];
  footerColumns: TableFooterColumn[];
}

export interface CallToAction {
  id: number;
  url: string;
  newTab: boolean;
  type: string; // e.g., 'primary', 'secondary'
  label: string;
}

export interface ExtraLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

// The main type for your section data
export type InsuranceSolutionSection = BaseSection & {
  title: string;
  description: string;
  extraInfo: string;
  table: TableData;
  callToAction: CallToAction;
  extraLinks: ExtraLink[];
};

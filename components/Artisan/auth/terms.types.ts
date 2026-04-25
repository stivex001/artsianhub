export interface SubSection {
  id: string;
  title?: string;
  content?: string;
  bullets?: string[];
  footer?: string;
}

export interface TermsSection {
  num: number;
  id: string;
  title: string;
  intro?: string;
  content?: string;
  bullets?: string[];
  subsections?: SubSection[];
  footer?: string;
}

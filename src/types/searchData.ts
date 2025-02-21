export interface searchData {
  searchParameters: SearchParameters;
  knowledgeGraph: KnowledgeGraph;
  organic: Organic[];
  peopleAlsoAsk: PeopleAlsoAsk[] | undefined;
  relatedSearches: RelatedSearch[] | undefined;
  credits: number;
}

export interface SearchParameters {
  q: string;
  type: string;
  engine: string;
}

export interface KnowledgeGraph {
  title: string;
  type: string;
  imageUrl: string;
  description: string;
  attributes: Attributes;
}

export interface Attributes {
  Address: string;
  Phone: string;
}

export interface Organic {
  title: string;
  link: string;
  snippet: string;
  sitelinks?: Sitelink[];
  position: number;
}

export interface Sitelink {
  title: string;
  link: string;
}

export interface PeopleAlsoAsk {
  question: string;
  snippet: string;
  title: string;
  link: string;
}

export interface RelatedSearch {
  query: string;
}

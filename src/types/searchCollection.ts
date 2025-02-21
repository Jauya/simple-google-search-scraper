import { PeopleAlsoAsk, RelatedSearch } from "./searchData";

export type SearchCollection = {
  uuid: string;
  relatedSearches: RelatedSearch[];
  peopleAlsoAsk: PeopleAlsoAsk[];
  date: number;
};
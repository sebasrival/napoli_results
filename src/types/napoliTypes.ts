export type NapoliCategoryType = {
  id?: number,
  laps?: string,
  name: string,
  distance?: string,
  start_time?: string
}

export type NapoliResultsType = {
  id?: number;
  avg_?: string
  laps?: string
  plate?: string
  team?: string
  position?: string;
  full_name?: string
  peloton_pos?: string
  arrival_time?: string
  category_name?: string
  diff_to_winner?: string
  total_race_time?: string
}

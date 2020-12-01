export interface IActivityLog {
  data: Array<ILog>;
  meta: {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  };
}

export interface ILog {
  id: number;
  date: string;
  description: string;
  user: {
    id: number;
    name: string;
    surname: string;
  };
}

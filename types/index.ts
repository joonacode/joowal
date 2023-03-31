export interface TImageItem {
  avg_color: string;
  height: number;
  width?: number;
  photographer?: string;
  photographer_url?: string;
  src?: string;
  listSrc?: {
    key: string
    value: string
  }[]
  isLoading?: boolean;
  showModalDetail: () => void;
  resImage: any;
}
export interface TListImage {
  col1: TImageItem[];
  col2: TImageItem[];
  col3: TImageItem[];
}

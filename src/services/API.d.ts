declare namespace API {
  export interface AccountInfo {
    id?: string;
    avatar?: string;
    username?: string;
    nickname?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}

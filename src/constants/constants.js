export const STATUSES = {
  TODO: 0,
  IN_PROGRESS: 1,
  DONE: 2,
  ARCHIVED: 3
};

export const STATUS_LABELS = {
  [STATUSES.TODO]: 'To Do',
  [STATUSES.IN_PROGRESS]: 'In Progress',
  [STATUSES.DONE]: 'Done',
  [STATUSES.ARCHIVED]: 'Archived'
};

export const API_URL = "https://680fc8ae27f2fdac240f60df.mockapi.io/tasks";
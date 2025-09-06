export enum InnLevel {
  Poor = "Poor", // 100 copper
  Comfortable = "Comfortable", // 300 copper
  Luxury = "Luxury", // 2000 copper
  Premium = "Premium", // 5000 copper
}

export type InnConfig = {
  costPerRoom: number;
  roomSize: number;
};

export type LocationInns = {
  [key in InnLevel]: InnConfig | null;
};

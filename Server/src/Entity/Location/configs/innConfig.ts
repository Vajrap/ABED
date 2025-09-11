enum InnType {
    TAVERN = "TAVERN",
    HOTEL = "HOTEL",
    MOTEL = "MOTEL"
}

export type InnConfig = {
  type: InnType;
  price: number;
};

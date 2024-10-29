interface IStorage {
  set: (name: string, item: any) => void;
  get: (name: string) => any;
  delete: (name: string) => void;
}

/**
 * Класс используемый для взаимодействия с localStorage
 */
export const Storage: IStorage = {
  /**
   * Добавление элемента в хранилище
   */
  set: (name, item) => {
    localStorage.setItem("electro_" + name, JSON.stringify(item));
  },
  /**
   * Получение элемента из хранилища
   */
  get: (name) => {
    const item = localStorage.getItem("electro_" + name);

    if (item) {
      return JSON.parse(item);
    }
  },
  /**
   * Добавление элемента в хранилище
   */
  delete: (name) => {
    localStorage.removeItem("electro_" + name);
  }
};

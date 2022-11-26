// HUMAN STORE
import { getHuman } from "../services/humanService";

class Human {
  constructor(id) {
    this.id = id;
    this.user = user;
    this.firstName = firstName;
    this.LastName = LastName;
    this.history = history;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Getter
  get Human() {
    return this.getHumanObject();
  }
  // Methods
  static retrieveHumanFromDatabase = async(id) => {
    const human = await getHuman(id)
    return Promise.resolve(human);
  }

}

const loggedInStudent = new Human('630fbcd603c610ee444351b5');

console.log(loggedInStudent);

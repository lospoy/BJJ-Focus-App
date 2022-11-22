// HUMAN STORE

class Human {

  // constructor(id, user, firstName, LastName, history, status, createdAt, updatedAt) {
  //   this.id = id;
  //   this.user = user;
  //   this.firstName = firstName;
  //   this.LastName = LastName;
  //   this.history = history;
  //   this.status = status;
  //   this.createdAt = createdAt;
  //   this.upupdatedAt = updatedAt;
  // }
  // Getter
  get human(id) {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
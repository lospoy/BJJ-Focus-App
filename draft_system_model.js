// Draft of the system design pattern for the BJJ app
// USING DECORATOR PATTERN
// Based on https://miro.com/app/board/uXjVPePIw5o=/

// LESSONS
// based on Decorator pattern >> components are super basic, then decorator class modifies them?
class Lessons {
  constructor(teacher, duration, level) {
    this.teacher = teacher
    this.duration = duration
    this.level = level
    this.date = New(date)
  }

  formatDuration() {
    // formats duration integer into minutes?
    // boundaries? no negative or zero, no more than 1.5 hours, etc
  }

  getInfo() {
    const lessonInfo = {
      teacher: this.teacher,
      duration: this.formatDuration(),
      level: this.level,
      date: this.date,
    }
    return lessonInfo
  }

  
}
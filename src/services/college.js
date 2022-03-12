// Data processor
export default class College {
    #courseData
    #coursesProvider 
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course) {
        
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openingDate = new Date(course.openingDate);
        const validationMessage = this.#getValidationMessage(course);
        if(!validationMessage) {
           return this.#coursesProvider.add(course);
        } 
        return validationMessage;
    }
    #getValidationMessage(course) {
        const {minCost, maxCost, minHours, maxHours, minYear, maxYear, lectors, courses} = this.#courseData;
        const {cost, hours, openingDate, lecturer, name} = course
        
        let message = '';
        message += cost > maxCost || cost < minCost ?
         `<br>wrong cost value - should be in range [${minCost}-${maxCost}] `: '';
         message += hours > maxHours || hours < minHours ?
         `<br>wrong hours value - should be in range [${minHours}-${maxHours}] `: '';
         message += !lectors.includes(lecturer) ? `<br >wrong lecturer name - should be one from ${lectors} `: '';
         message += !courses.includes(name) ? `<br> wrong course name - should be one from ${courses}`:'';
         const year = openingDate.getFullYear();
         message += year < minYear || year > maxYear ?
          `wrong opening date - year should be in range [${minYear} - ${maxYear}]` : ''
         return message;
    }
    getAllCourses() {
        return this.#coursesProvider.get()
    }

    sortCourses(key)

    sortCourses(key) {
        return _.sortBy(this.getAllCourses(), key)
    }
}
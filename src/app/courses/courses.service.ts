export class CoursesService {
    getCourses() {
        return [
             { courseName: "Physics 101", isFavorite: true},
             { courseName: "Chemistry 110", isFavorite: false},
             { courseName: "Biology 101", isFavorite: true},
             { courseName: "Anthropology 101", isFavorite: true},
            ]
    }
}
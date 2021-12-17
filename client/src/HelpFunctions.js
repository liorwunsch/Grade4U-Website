/* This JS file consists of helper function in order to manage our 
    premission and accesbility to the website */
const PremissionEnum = {"Student": 0, "Lecturer": 1}
Object.freeze(PremissionEnum)

export function isLecturer() {
    let UserData = JSON.parse(sessionStorage.getItem('User'));
    if (UserData === null) {
        return false;
    }
    else {
        return UserData.Permission === PremissionEnum.Lecturer;
    }
}

export function isStudent() {
    let UserData = JSON.parse(sessionStorage.getItem('User'));
    if (UserData === null) {
        return false;
    }
    else {
        return UserData.Permission === PremissionEnum.Student;
    }
}

export function isLoggedIn() {
    let UserData = JSON.parse(sessionStorage.getItem('User'));
    return UserData !== null;
}


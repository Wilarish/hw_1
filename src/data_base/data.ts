export type DBType = {
    courses: CourseType[],
    users: UserType[],
    students: StudentType[]
}
export type CourseType = { id: number, title: string, student_count: number }
export type UserType = { id: number, name: string }
export type StudentType = { id: number,name: string, course_id: number, date: Date }
export const db: DBType = {
    courses:[
        {id: 1,title:'back-end',student_count:127 },
        {id: 2,title:'front-end',student_count:201 },
        {id: 3,title:'sales',student_count:54 },
        {id: 4,title:'marketing',student_count:103 },
        {id: 5,title:'team leading',student_count:41 }

    ],
    users:[
        {id: 1,name:'Ivan' },
        {id: 2,name:'Oleg' },
        {id: 3,name:'Slava' },
        {id: 4,name:'Kolya' }

    ],
    students:[
        {id: 1,name:'Ivan',course_id:1, date: new Date(2023,9,11)},
        {id: 2,name:'Slava',course_id:1, date: new Date(2023,9,11)},
        {id: 3,name:'Pasha',course_id:1, date: new Date(2023,9,11)},
        {id: 4,name:'Yarik',course_id:2, date: new Date(2023,9,15)}

    ]
}

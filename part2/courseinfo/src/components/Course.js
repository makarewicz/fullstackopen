const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
    parts.map(part => <Part part={part} key={part.id} />)


const Total = ({ parts }) => {
    const totalExercises = parts.reduce((x, p) => x + p.exercises, 0)
    return <p>Number of exercises {totalExercises}</p>
}

const Course = ({ course }) =>
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>

export default Course
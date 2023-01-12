const Course = ({course}) => {
    const parts = course.parts
    let total = parts.reduce(function (pre,cur) {
      return pre + cur.exercises
    },0)
    
    return (
      <div>
        <h1>{course.name}</h1>
        {parts.map(part => {
          return (
            <p key={part.id}>{part.name} {part.exercises}</p>
          )
        })}
        <h3>total of {total} exercises</h3>
        
      </div>
    )
  }

  export default Course
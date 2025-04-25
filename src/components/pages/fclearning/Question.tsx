
const Question = ({question}: {question:string}) => {
  return (
    <div className="text-base my-8">
      {/* <p>I wanna <span className="underline">get rid of</span> this jacket!</p> */}
      <p>{question}</p>
    </div>
  )
}

export default Question

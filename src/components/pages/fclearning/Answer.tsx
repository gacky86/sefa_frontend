
const Answer = ({answer}: {answer:string}) => {
  return (
    <div className="text-base my-8 mx-5">
      {/* <p>このジャケット<span className="underline">を捨てたい</span>！</p> */}
      <p>{answer}</p>
    </div>
  )
}

export default Answer

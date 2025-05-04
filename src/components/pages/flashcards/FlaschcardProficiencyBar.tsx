const FlaschcardProficiencyBar = ({proficiency}: {proficiency: string}) => {
  return (
    <div className="w-[100%] bg-white border-[0.5px] rounded-full h-[10px] text-center">
      <div className={`bg-auqa-blue h-2 rounded-full`} style={{width: `${proficiency}%`}}></div>
    </div>
  )
}

export default FlaschcardProficiencyBar

const ControlAudio = ({ setToggle }: any) => {
  const stop = () => {
    setToggle(false)
  }
  return (
    <div className='control-audio'>
      <span onClick={stop} className="stop material-symbols-outlined">
        stop_circle
      </span>
    </div>
  )
}

export default ControlAudio
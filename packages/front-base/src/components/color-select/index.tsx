const colorList=[
  "c1cbd7",
  "afb0b2",
  "939391",
  "bfbfbf",
  "e0e5df",
  "b5c4b1",
  "8696a7",
  "9ca8b8",
  "ececea",
  "fffaf4",
  "96a48b",
  "7b8b6f",
  "dfd7d7",
  "656565",
  "d8caaf",
  "c5b8a5",
  "fdf9ee",
  "f0ebe5",
  "d3d4cc",
  "e0cdcf",
  "b7b1a5",
  "a29988",
  "dadad8",
  "f8ebda",
]
export default ()=>{
  
  return (<div>
{
  colorList.map(v=>(
    <div className={'style'} ></div>
  ))
}
  </div>)
}
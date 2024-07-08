import { useState } from "react";

const ChartComponent = () => {
  const [type,setType] = useState(1)
  return (
    <div className="rounded-sm border border-stroke shadow mt-4 px-8 py-6">
      <h4 className=" text-xl font-semibold text-black ">Analysis</h4>
      <div className="flex gap-2 mt-4">
        <button onClick={()=>setType(1)} className={`px-4 py-2 rounded-md ${type===1?"bg-primary text-white":"bg-white text-black"} border border-stroke`}>Line Chart</button>
        <button onClick={()=>setType(2)} className={`px-4 py-2 rounded-md ${type===2?"bg-primary text-white":"bg-white text-black"} border border-stroke`}>Bar Chart</button>
        <button onClick={()=>setType(3)} className={`px-4 py-2 rounded-md ${type===3?"bg-primary text-white":"bg-white text-black"} border border-stroke`}>Pie Chart</button>
      </div>
      <div className="h-96 mt-4 border-t">
        {type===1 && <div>Line Chart</div>}
        {type===2 && <div>Bar Chart</div>}
        {type===3 && <div>Pie Chart</div>}
      </div>
    </div>
  );
};

export default ChartComponent;

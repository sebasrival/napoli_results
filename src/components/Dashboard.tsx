import { CategoryNapoliList } from "./CategoryNapoliList"
import { TableNapoliResults } from "./TableNapoliResults"


export const Dashboard = () => {
  return (
    <div className='flex h-screen w-full bg-slate-800 text-white'>
      <div className="flex flex-col mx-auto lg:w-9/12 xl:w-7/12 w-full">
        <div className="flex flex-col pt-10 bg-slate-800">
          <div className="flex flex-row justify-center items-center">
            <h1 className="text-3xl font-bold">Napoli Results</h1>
          </div>
          <TableNapoliResults />
        </div>
      </div>
    </div>
  )
}

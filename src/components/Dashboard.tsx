import { TableNapoliResults } from "./TableNapoliResults"


export const Dashboard = () => {
  return (
    <div className='flex h-screen w-full bg-slate-800 overflow-y-auto text-white'>
      <div className="flex flex-col mx-auto w-full lg:w-8/12 xl:w-7/12 md:w-9/12 sm:w-10/12">
        <div className="flex flex-col px-2">
          {/* <div className="flex flex-row justify-center items-center">
            <h1 className="text-3xl font-bold">Napoli Results</h1>
          </div> */}
          <TableNapoliResults />
        </div>
      </div>
    </div>
  )
}

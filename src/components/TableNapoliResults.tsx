import { useEffect, useState } from "react"
import { NapoliResultsType } from "../types/napoliTypes"
import { urls } from "../api/urls";
import axios from "axios";
import { CategoryNapoliList } from "./CategoryNapoliList";
import Flag from 'react-flagkit';



export const TableNapoliResults = (props) => {

    const [napoliResults, setNapoliResults] = useState<NapoliResultsType[]>([])
    const [napoliResultsFiltered, setNapoliResultsFiltered] = useState<NapoliResultsType[]>([])
    const [categoryFilter, setCategoryFilter] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const isCategorySame = (categoryName) => {
        return categoryName === categoryFilter
    }

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios({
            url: `${urls.results}`,
            method: 'GET'
        }).then((res) => {
            setNapoliResults(res.data)
            setLoading(false)
            console.log(res.data)
        }).catch((error) => {
            setLoading(false)
            setError(true)
            console.log(error)
        })
    }, [])

    useEffect(() => {
        setNapoliResultsFiltered(
            napoliResults.filter((result) => isCategorySame(result.category_name)).filter((result) => result.full_name !== null)
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryFilter, napoliResults])

    useEffect(() => {
        console.log(categoryFilter)
    }, [categoryFilter])

    const getNoCyclistsMessage = () => {
        if (!loading && napoliResultsFiltered.length === 0 && napoliResults.length !== 0 && categoryFilter !== '' && categoryFilter !== undefined)
            return 'No han pasado ciclistas de esa categoría :( . Intente en unos momentos nuevamente.'
        if (categoryFilter === undefined) return (
            <div className="text-red-500 flex justify-center">
                Ha ocurrido un error. Inténtenlo nuevamente en unos momentos.
            </div>
        )
    }

    const getErrorMessage = () => {
        return error && <div className="text-red-500 flex justify-center">
            Ha ocurrido un error. Inténtenlo nuevamente en unos momentos.
        </div>
    }

    const getUpdateNapoliResults = () => {
        setNapoliResultsFiltered([])
        setLoading(true)
        setError(false)
        axios({
            url: `${urls.results}`,
            method: 'GET'
        }).then((res) => {
            setNapoliResults(res.data)
            setLoading(false)
            console.log(res.data)
        }).catch((error) => {
            setLoading(false)
            setError(true)
            console.log(error)
        })
    }

    return (
        <div className="flex flex-col py-5 gap-5">
            <div className="flex flex-row w-full flex-nowrap justify-between">
                <h1 className="text-2xl font-semibold">Categorias</h1>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800   font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={() => { getUpdateNapoliResults() }}>Actualizar Resultados</button>
            </div>
            <CategoryNapoliList setCategory={setCategoryFilter} />
            {!error &&
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg" {...props}>
                    <table className="w-full text-sm text-left text-gray-400 border-collapse">
                        <thead className="text-xs uppercase  bg-gray-700 text-gray-300">
                            <tr>
                                <th scope="col" className="px-1 text-center">
                                    N°
                                </th>
                                <th scope="col"></th>
                                <th scope="col" className="px-1 py-3">
                                    Corredor
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">
                                    Tiempo
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">
                                    Laps
                                </th>
                                <th scope="col" className="px-1 py-3 text-center">
                                    Diferencia
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {napoliResultsFiltered.map((result) => (
                                <tr key={result.id} className="border-b bg-gray-900 border-gray-700 text-white">
                                    <th scope="row" className="px-1 py-4 font-medium text-center border-r border-gray-700">
                                        {result.position}
                                    </th>
                                    <td className="px-1 border-r border-gray-700" width={30} style={{ minWidth: '20px' }}>
                                        <Flag country="PY" />
                                    </td>
                                    <td className="px-1 border-r border-gray-700 h-auto">
                                        <div className="flex flex-col">
                                            <span><b>{result.full_name} </b> ({result.plate})</span>
                                            <i>{result.team}</i>
                                        </div>
                                    </td>
                                    <td className="px-1 border-r border-gray-700 text-end">
                                        <b>{result.arrival_time}</b>
                                        <br />
                                        {result.avg_}<i>km/h</i>
                                    </td>
                                    <td className="px-1 text-center border-r border-gray-700">
                                        <span>{result.laps}</span>
                                    </td>
                                    <td className="px-1 text-center">
                                        <span>{result.diff_to_winner}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            {getErrorMessage()}
            {getNoCyclistsMessage()}
            <div className="flex flex-row justify-center">
                {loading && 'Cargando...'}
            </div>
        </div>



    )
}

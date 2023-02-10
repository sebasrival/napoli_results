import React, { useEffect, useState } from "react"
import { NapoliResultsType } from "../types/napoliTypes"
import { urls } from "../api/urls";
import axios from "axios";
import { CategoryNapoliList } from "./CategoryNapoliList";


export const TableNapoliResults = (props) => {

    const [napoliResults, setNapoliResults] = useState<NapoliResultsType[]>([])
    const [categoryFilter, setCategoryFilter] = useState('')

    const isCategorySame = (categoryName) => {
        return  categoryName === categoryFilter
    }

    useEffect(() => {
        axios({
            url: `${urls.results}`,
            method: 'GET'
        }).then((res) => {
            setNapoliResults(res.data)
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        console.log(categoryFilter)
    }, [categoryFilter])

    return (
        <div className="flex flex-col px-10 py-5 gap-5">
            <div className="flex flex-row">
                <h1 className="text-2xl font-semibold">Categorias</h1>
            </div>
            <CategoryNapoliList setCategory={setCategoryFilter} />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg" {...props}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-3 py-3">
                                N°
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Corredor
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Tiempo
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Laps
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Diferencia
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {napoliResults.filter((result) => isCategorySame(result.category_name)).filter((result) => result.full_name !== null).map((result) => (
                            <tr key={result.id} className="border-b bg-gray-900 border-gray-700 text-white">
                                <th scope="row" className="px-3 py-4 font-medium">
                                    {result.position}
                                </th>
                                <td className="px-3 py-4">
                                    <div className="flex flex-col">
                                        <span><b>{result.full_name} </b> ({result.plate})</span>
                                        <i>{result.team}</i>
                                    </div>
                                </td>
                                <td className="px-3 py-4 flex flex-col">
                                    <b><span>{result.total_race_time}</span></b>
                                    <span>{result.avg_} <i>km/h</i></span>
                                </td>
                                <td className="px-3 py-4">
                                    <span>{result.laps}</span>
                                </td>
                                <td className="px-3 py-4">
                                    <span>{result.diff_to_winner}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>



    )
}

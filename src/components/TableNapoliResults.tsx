import React, { useEffect, useState } from "react"
import { NapoliResultsType } from "../types/napoliTypes"
import { urls } from "../api/urls";
import axios from "axios";
import { CategoryNapoliList } from "./CategoryNapoliList";


export const TableNapoliResults = (props) => {

    const [napoliResults, setNapoliResults] = useState<NapoliResultsType[]>([])
    const [categoryFilter, setCategoryFilter] = useState('')

    const isCategorySame = (categoryName) => {
        return categoryFilter === '' || categoryName === categoryFilter
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

    useEffect(()=>{
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
                                Hora de Llegada / Diferencia
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Tiempo total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {napoliResults.filter((result) => isCategorySame(result.category_name)).map((result) => (
                            <tr key={result.id} className="border-b bg-gray-900 border-gray-700">
                                <th scope="row" className="px-3 py-4 font-medium text-white">
                                    {result.position}
                                </th>
                                <td className="px-3 py-4">
                                    <span>{result.full_name}</span>
                                </td>
                                <td className="px-3 py-4">
                                    <span>{result.arrival_time}</span> /
                                    <span> {result.diff_to_winner}</span>
                                </td>
                                <td className="px-3 py-4">
                                    <span>{result.total_race_time}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>



    )
}

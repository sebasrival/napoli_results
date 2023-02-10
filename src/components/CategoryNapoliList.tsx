import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { urls } from '../api/urls'
import { NapoliCategoryType } from '../types/napoliTypes'

type PropsType = {
  setCategory: (category: string) => void
}

export function CategoryNapoliList({ setCategory, ...props }: PropsType) {
  const [query, setQuery] = useState('')
  const [napoliCategories, setNapoliCategories] = useState<NapoliCategoryType[]>([])
  const [selected, setSelected] = useState<NapoliCategoryType>({name:''})

  const filteredCategory =
    query === ''
      ? napoliCategories
      : napoliCategories.filter(category =>
        category.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  useEffect(() => {
    axios({
      url: `${urls.categories}`,
      method: 'GET',
    }).then((res) => {
      setNapoliCategories(res.data)
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(()=>{
    console.log(selected)
}, [selected])

  useEffect(()=>{
    setCategory(selected?.name)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selected])

  return (
    <div className="flex flex-col z-10">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(category: unknown) => (category as NapoliCategoryType).name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCategory.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No se encuentra la Categoría
                </div>
              ) : (
                filteredCategory.map((category) => (
                  <Combobox.Option
                    key={category.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {category.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                              }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
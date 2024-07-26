import React, {useEffect, useMemo, useRef, useState} from 'react';
import {debounce, getSlugFromUrl, normalize} from "../../utils/convert";
import {wikiAPI} from "../../api/wp";
import IOption from "./../../types/option";
import Page from "../Page";
import useOutsideAlerter from "../../hooks/UseOutsideAlerter";


const Search = () => {
    const inputRef = useRef(null)
    const wrapperRef = useRef(null)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [inputText, setInputText] = useState<string>('')
    const [options, setOptions] = useState<IOption[]>([])

    const [searchAutoComplete, {data, isLoading, isSuccess}] = wikiAPI.useSearchAutoCompleteMutation()
    const [getViewsData, {data: viewsData, isLoading: isViewsDataLoading, isSuccess: isViewsDataSuccess}] = wikiAPI.useGetViewsDataMutation()
    const [getRevisions, {data: revisions, isLoading: isRevisionsLoading, isSuccess: isRevisionsSuccess}] = wikiAPI.useGetRevisionsMutation()
    const [checkRedirect, {data: redirect, isLoading: isRedirectLoading, isSuccess: isRedirectSuccess}] = wikiAPI.useCheckRedirectMutation()

    const debouncedSearchAutoComplete = useMemo(() => {
        return debounce(searchAutoComplete, 1000)
    },[])

    const chooseOption = async (option: IOption) => {
        setInputText(option.title)

        let searchValue = option.title

        const pageSlug = getSlugFromUrl(option.url)
        if (!pageSlug) return;

        let redirectResponse = await checkRedirect(option.title)
        if (redirectResponse['data'] && redirectResponse['data'] !== true) {
            searchValue = redirectResponse['data']
        }

        searchValue = normalize(searchValue)

        await getViewsData(searchValue)

        getRevisions(searchValue)

        setIsFocused(false)
    }

    useOutsideAlerter(wrapperRef, () => setIsFocused(false))

    const focusInput = () => {
        setIsFocused(true)
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputText(value ?? '')

        if (value.length < 2) {
            setOptions([])
            return;
        }

        debouncedSearchAutoComplete(value)
    }

    useEffect(() => {
        setOptions(data ? data : [])
    }, [data])

    // useEffect(() => {
    //     if (inputText.length > 2 && viewsData && viewsData.length) {
    //         getRevisions(inputText)
    //     }
    // }, [viewsData])

    return (
        <section className="mb-[15px]">
            <div className="container">
                <div className="relative min-h-[40px]">
                    <div className="absolute z-[100] w-full border-[2px] rounded-lg">
                        <div className="text-sm text-[#111111] w-full z-10 rounded-lg max-h-[300px] overflow-y-scroll" ref={wrapperRef}>
                            <input
                                className="block w-full px-3 py-2 rounded-lg focus:outline-none placeholder-gray-700"
                                type="text"
                                placeholder="Search..."
                                autoComplete="off"
                                value={inputText}
                                onChange={changeInput}
                                onFocus={focusInput}
                                ref={inputRef}
                            />
                            {isFocused && options && options.map((option, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        chooseOption(option)
                                    }}
                                    className="block px-3 py-2 text-sm text-[#111111] bg-[#EFEFEF] hover:bg-[#DFDFDF] cursor-pointer"
                                >
                                    {option.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Search;
import React, {ChangeEvent, MouseEvent, MouseEventHandler, useEffect, useRef, useState} from 'react';
import classNames from "classnames";
import ArrowDownIcon from "../icons/ArrowDownIcon";

type TSelectOptions = {[key: string | number]: string}

type TSearchableSelectProps = {
    inputClassName?: string
    labelClassName?: string
    title?: string
    label?: string
    value: string | number
    onChange: (name: string, value: string | number) => void
    id?: string
    emptyOption?: boolean
    options: TSelectOptions
    name: string
    searchable?: boolean
}

type TSearchableSelectState = {
    title: string
    value: string | number
}

const SearchableSelect = ({inputClassName, labelClassName, title, label, value, onChange, id, emptyOption, options, name, searchable}: TSearchableSelectProps) => {
    const ref = useRef(null)

   labelClassName = 'flex items-center flex-1 rounded-l border-r border-[#aaaaaa] bg-[#222222] px-3 text-sm text-[#F0F0F0]' + (labelClassName ? ' ' + labelClassName : '')
    if (!id) id = name + '_' + Date.now()

    const [optionsState, setOptionsState] = useState(options)

    const [selectValue, setSelectValue] = useState<TSearchableSelectState>({
        title: value && options[value] ? options[value] : (title ?? ''),
        value: value ?? ''
    })

    const [inputText, setInputText] = useState<string>('')

    const [isOpened, setIsOpened] = useState<boolean>(false)

    useEffect(() => {
        window.addEventListener('click',function(e) {
            if (!ref.current) return;

            const select = ref.current as HTMLDivElement
            if (!select) return;

            const target = e.target as HTMLElement
            if (!select.contains(target)){
                setIsOpened(false)
            }
        });
    }, [])

    useEffect(() => {
        setSelectValue({
            title: value && options[value] ? options[value] : (title ?? ''),
            value: selectValue.value ?? ''
        })
    }, [options])

    const onOptionChange = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const target = e.target as HTMLAnchorElement
        const v = target?.dataset?.value
        const t = target?.innerHTML
        if (v === undefined) return;
        setSelectValue({
            title: t, value: v
        })
        setIsOpened(false)
        onChange(name, v)
    }

    const toggleSelect = () => {
        setIsOpened(!isOpened)
    }

    const filterOptions = (v: string) => {
        if (!v) {
            setOptionsState(options)
            return;
        }

        const os = {...optionsState}
        Object.keys(os).forEach(key => {
            if (os[key].toString().toLowerCase().search(v) === -1) {
                delete os[key]
            }
        })
        setOptionsState(os)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
        filterOptions(e.target.value)
    }

    return (
        <div className="relative w-full border-[2px] rounded-lg" id={id} ref={ref}>
            <div className={classNames('text-sm text-[#111111] w-full z-10 rounded-lg')}>
                {searchable && <input className="block w-full px-3 py-2 rounded-lg focus:outline-none placeholder-gray-700" type="text" placeholder="Search..." autoComplete="off" value={inputText} onChange={onInputChange} />}
                {options && Object.keys(optionsState).map(key => (
                    <a key={key} href="#" data-value={key} onClick={onOptionChange} className="block px-3 py-2 text-sm text-[#111111] bg-[#EFEFEF] hover:bg-[#DFDFDF] cursor-pointer">
                        {options[key]}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default SearchableSelect;
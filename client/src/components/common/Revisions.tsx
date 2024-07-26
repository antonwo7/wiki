import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../store/hooks";
import IRevision from "../../types/revision";
import {limit} from "../../utils/convert";
import ProfileIcon from "./icons/ProfileIcon";
import {wikiAPI} from "../../api/wp";
import {decodeHtmlEntity, getRev} from "../../utils/parsing";
import classNames from "classnames";
import LoadingIcon from "./icons/LoadingIcon";

const Revisions = () => {
    const [activeRevision, setActiveRevision] = useState<IRevision | null>(null)
    const [loadingRevisionId, setLoadingRevisionId] = useState<number>(0)
    const revisions: IRevision[] = useAppSelector(state => state.search.revisions)
    const [getRevision, {data: activeRevisionStrings, isLoading: isRevisionLoading, isSuccess: isRevisionSuccess}] = wikiAPI.useGetRevisionMutation()

    useEffect(() => {
        const revision = Array.isArray(revisions) && revisions.length
            ? revisions[0]
            : null

        setActiveRevision(revision)
        if (revision) {
            getRevision(revision.id)
        }

    }, [revisions])

    useEffect(() => {
        if (!isRevisionLoading) {
            setLoadingRevisionId(0)
        }
    }, [isRevisionLoading])

    if (!revisions.length) {
        return <></>;
    }

    const chooseRevision = (revision: IRevision) => {
        setLoadingRevisionId(revision.id)
        setActiveRevision(revision)
        setTimeout(() => getRevision(revision.id), 500)
    }

    return (
        <section className="py-[40px]">
            <div className="container">
                <div className="text-gray-700">
                    <h2 className="mb-[50px] text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl text-center">
                        <mark className="px-2 py-1 text-white bg-[#546E7A] rounded">Revisions</mark>
                    </h2>
                    <div className="flex flex-wrap md:flex-nowrap">
                        <div className="w-full md:w-[400px]">
                            <ul className="flex-column text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
                                {revisions.map((revision, i) => (
                                    <li className="mb-1" key={revision.id}>
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault()
                                                chooseRevision(revision)
                                            }}
                                            href="#"
                                            className={classNames('relative block py-1 px-3 md:py-3 text-[#111111] rounded-lg w-full', {
                                                'bg-[#546E7A] text-white': +revision.id === activeRevision?.id,
                                                'bg-gray-100 hover:bg-gray-200': +revision.id !== activeRevision?.id,
                                            })}
                                        >
                                            <div className={classNames('flex items-center', {
                                                'opacity-10': revision.id === loadingRevisionId
                                            })}>
                                                {`${revision.date}`}
                                                <div className={classNames('flex ml-[20px] py-1 px-2 bg-gray-200 rounded-lg text-gray-700 items-center', {})}>
                                                    <ProfileIcon width={15} height={15} />
                                                    <span className="ml-1" title={revision.username}>{limit(revision.username, 9)}</span>
                                                </div>
                                            </div>
                                            {revision.id === loadingRevisionId && <div className="absolute left-15 top-0 items-center flex h-full">
                                                <LoadingIcon />
                                            </div>}
                                        </a>

                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={classNames('w-full ml-3 mt-[14px] revision', {
                            'invisible': loadingRevisionId
                        })}>
                            {!!activeRevision && activeRevisionStrings && <div className="mb-4">
                                <span className="mr-4 bg-gray-200 px-3 py-2 rounded-lg">
                                    <b>Date: </b>{activeRevision.date}
                                </span>
                                <span className="mr-4 bg-gray-200 px-3 py-2 rounded-lg">
                                    <b>Author: </b>{activeRevision.username}
                                </span>
                                <span className="mr-4 bg-gray-200 px-3 py-2 rounded-lg">
                                    <b>Size: </b>{activeRevision.size} bytes
                                </span>
                                <span className="mr-4 bg-gray-200 px-3 py-2 rounded-lg">
                                    <b>Change size: </b>{activeRevision.changeSize} bytes
                                </span>
                            </div>}

                            {!!activeRevisionStrings
                            && !!activeRevisionStrings.length
                            && activeRevisionStrings.map((str, i) =>
                                <p key={i} dangerouslySetInnerHTML={{__html: decodeHtmlEntity(str)}} className="mb-2" />)}

                            {!!activeRevisionStrings
                            && !activeRevisionStrings.length
                            && <span>(No difference)</span>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Revisions;
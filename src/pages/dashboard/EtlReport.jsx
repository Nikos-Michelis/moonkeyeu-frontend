import React, {useEffect, useState} from "react";
import { useAuth } from "@/context/AuthProvider.jsx";
import toast from "react-hot-toast";
import { useSimpleQuery } from "@/services/queries.jsx";
import Table from "@/components/table/Table.jsx";
import { DateTime } from "luxon";
import { Button } from "@/components/button/Button.jsx";
import {getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from "@tanstack/react-table";
import Heading from "@/components/utils/heading/Heading.jsx";
import TablePagination from "@/components/pagination/TablePagination.jsx";
import SpinnerLoader from "@/components/loader/SpinnerLoader.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBug, faChevronLeft, faCircleExclamation, faLink} from '@fortawesome/free-solid-svg-icons';
import ContentContainer from "@/layout/ContentContainer.jsx";
import AlertModal from "@/components/modal/dialog/AlertModal.jsx";
import {faCopy} from "@fortawesome/free-regular-svg-icons/faCopy";
import useClipboard from "@/hooks/util/useClipboard.jsx";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";

function EtlReport() {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const { user } = useAuth();
    const [sorting, setSorting] = useState([]);
    const { copied, copyToClipboard } = useClipboard();

    const handleShare = (message) => {
        copyToClipboard(message);
    };

    useEffect(() => {
        copied &&  toast(
            "Error message was copied to the clipboard.",
            { icon: <FontAwesomeIcon icon={faLink} /> }
        );
    }, [copied]);

    const columns = [
        {
            header: "ID",
            accessorKey: "jobExecutionId",
        },
        {
            header: "Task",
            accessorKey: "jobName",
        },
        {
            header: "StartTime",
            accessorKey: "startTime",
            cell: (info) =>
                info.getValue()
                    ? DateTime.fromISO(info.getValue()).toFormat("MMMM dd, yyyy - hh:mm:ss a")
                    : "-",
        },
        {
            header: "EndTime",
            accessorKey: "endTime",
            cell: (info) =>
                info.getValue()
                    ? DateTime.fromISO(info.getValue()).toFormat("MMMM dd, yyyy - hh:mm:ss a")
                    : "-",
        },
        {
            header: "Status",
            accessorKey: "status",
        },
        {
            header: "Actions",
            accessorKey: "actions",
            cell: ({ row }) => (
                <div>
                    {row.original.exitMessage ? (
                        <AlertModal>
                            <AlertModal.Button className="btn--transparent">
                                <FontAwesomeIcon icon={faCircleExclamation}/>
                            </AlertModal.Button>
                            <AlertModal.Content
                                classNames={{title: "padding-4"}}
                                title={<><FontAwesomeIcon icon={faBug} /> Exception Message</>}
                                okText="Welp, that's not good"
                            >
                                <div className="fs-small-100 padding-4 fw-bold log-wrap">
                                    <div className="flex justify-end fs-medium-400">
                                        <Button
                                            className="btn--transparent pos-absolute top-8 right-1"
                                            onClick={() => handleShare(row?.original?.exitMessage)}
                                        >
                                            <FontAwesomeIcon icon={faCopy} />
                                        </Button>
                                    </div>
                                    <div className="padding-2">
                                        {row?.original?.exitMessage}
                                    </div>
                                </div>
                            </AlertModal.Content>
                        </AlertModal>
                    ) : (
                        "-"
                    )}
                </div>
            ),
        },
    ];

    const queryData = useSimpleQuery({
        url: `${baseUrl}/dashboard/report/tasks`,
        cacheKey: "etl-report",
        queryOptions: {
            enabled: !!user,
            retry: 1,
        },
        options: { withCredentials: false, Bearer: true },
    });

    useEffect(() => {
        if (queryData.isError) {
            toast.error("Oops! Something went wrong, try again later.");
        }
    }, [queryData.isError]);


    const table = useReactTable({
        data: queryData?.data?.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageSize: 12 },
        },
        state: {
            sorting: sorting
        },
        onSortingChange: setSorting,
    });

    return (
        <>
            <ContentContainer>
                <Heading
                    title="ETL Tasks"
                    description="Track the progress and review detailed logs of all ETL tasks executed by the ETL API."
                />
                <JsonLdGeneric
                    type="CollectionPage"
                    title="ETL Tasks"
                    description="Track the progress and review detailed logs of all ETL tasks executed by the ETL API."
                />
                <section className="members-section">
                    <div className="container margin-block-end-13 padding-5" data-type="wide">
                        {!(queryData.isPending || queryData.isFetching) &&
                            <div className="flex justify-start margin-block-4">
                                <Button className="btn--transparent" onClick={() => window.history.back()}>
                                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                                </Button>
                            </div>
                        }
                        {(queryData.isPending || queryData.isFetching) ? <SpinnerLoader/> : <Table table={table} />}
                        <TablePagination table={table} />
                    </div>
                </section>
            </ContentContainer>
        </>
    );
}

export default EtlReport;

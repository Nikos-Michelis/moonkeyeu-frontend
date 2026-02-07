import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider.jsx";
import toast from "react-hot-toast";
import { useSimpleQuery } from "@/services/queries.jsx";
import Table from "@/components/table/Table.jsx";
import { DateTime } from "luxon";
import { Button } from "@/components/button/Button.jsx";
import Heading from "@/components/utils/heading/Heading.jsx";
import TablePagination from "@/components/pagination/TablePagination.jsx";
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import SpinnerLoader from "@/components/loader/SpinnerLoader.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import ContentContainer from "@/layout/ContentContainer.jsx";

function MembersReport() {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const { user } = useAuth();
    const [sorting, setSorting] = useState([]);

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Username",
            accessorKey: "username",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
         {
            header: "Roles",
            accessorKey: "role",
        },

        {
            header: "Enabled",
            accessorKey: "enabled",
            cell: ({ row }) => (row.original.enabled ? "Yes" : "No")

        },
        {
            header: "Locked",
            accessorKey: "accountNonLocked",
            cell: ({ row }) => (!row.original.accountNonLocked ? "Yes" : "No")

        },
        {
            header: "Registered",
            accessorKey: "createdAt",
            cell: (info) =>
                info.getValue()
                    ? DateTime.fromISO(info.getValue()).toFormat("dd-MM-yyyy")
                    : "-",
        },
    ];

    const queryData = useSimpleQuery({
        url: `${baseUrl}/dashboard/report/members`,
        cacheKey: "members",
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
                    title="Members"
                    description="Manage and view all registered members from your dashboard."
                />
                <JsonLdGeneric
                    type="CollectionPage"
                    title="Members"
                    description="Manage and view all registered members from your dashboard."
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

export default MembersReport;

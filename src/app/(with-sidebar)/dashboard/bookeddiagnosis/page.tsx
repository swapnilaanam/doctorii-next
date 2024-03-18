'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BookedDiagnosis = () => {
    const { data: diagnoses = [] } = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/bookings');

                if (response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    return (
        <section>
            <h2 className="text-2xl font-semibold text-center mt-14">Booked Diagnoses</h2>
            <div className="max-w-7xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-12">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-sky-100 text-sm rounded">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-5 py-2 font-semibold text-base text-gray-900">
                                    Diagnosis Name
                                </th>
                                <th className="whitespace-nowrap px-5 py-2 font-semibold text-base text-gray-900">
                                    Diagnosed Area
                                </th>
                                <th className="whitespace-nowrap px-5 py-2 font-semibold text-base text-gray-900">
                                    Ticket Price
                                </th>
                                <th className="whitespace-nowrap px-5 py-2 font-semibold text-base text-gray-900">
                                    Customer Name
                                </th>
                                <th className="px-5 py-2">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-sky-50">
                            {
                                diagnoses?.map((diagnosis) => {
                                    return (
                                        <tr key={diagnosis?._id} className="text-center">
                                            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-900">
                                                {diagnosis?.diagnosisName}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-700">
                                                {diagnosis?.diagnosedArea}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-700">
                                                ${diagnosis?.ticketPrice}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-700">
                                                {diagnosis?.customerName}
                                            </td>
                                            <td className="whitespace-nowrap px-7 py-2">
                                                {
                                                    diagnosis?.result === 'In Lab' ? (
                                                        <h4 className="whitespace-nowrap px-4 py-2 text-base font-medium text-red-600">
                                                            {diagnosis?.result}
                                                        </h4>
                                                    ) : (
                                                        <button className="inline-block rounded bg-green-600 px-7 py-2 text-sm font-medium text-white hover:bg-green-700 "
                                                        >
                                                            View Result
                                                        </button>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    )
}

export default BookedDiagnosis
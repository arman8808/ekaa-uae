import { useState } from "react";
import React from "react";
import FamilySessionForm from "./FamilySessionForm";
import { motion, AnimatePresence } from "framer-motion";
import { formatEventDateRange } from "../../pages/Practitioner";
const UpcomingSessions = ({ events }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const sessions = [
    {
      id: 1,
      Event: "FC-10 People",
      Date: "Aug 12, 2025",
      Location: "Houston",
      capacity: "10 Seats",
      organisedby: "Dr Aiyasawmy's A/C",
      // price: "$ 375",
      status: "Open",
    },
    {
      id: 2,
      Event: "Decode Foundation",
      Date: "FC With PTI",
      Location: "Houston",
      capacity: "10 Seats",
      organisedby: "Dr Aiyasawmy's A/C",
      // price: "$ 375",
      status: "Open",
    },
    {
      id: 3,
      Event: "FC (batches of 10)",
      Date: "Aug 22, 2025",
      Location: "Austin",
      capacity: "10 Seats",
      organisedby: "Dr Manoj's A/C",
      // price: "$ 375",
      status: "Open",
    },
    {
      id: 4,
      Event: "FC (separate batches of 10)",
      Date: "Aug 23, 2025",
      Location: "Austin",
      capacity: "10 Seats",
      organisedby: "Dr Manoj's A/C",
      // price: "$ 375",
      status: "Open",
    },
    {
      id: 5,
      Event: "FC - limit 10 participants",
      Date: "Aug 28, 2025",
      Location: "Woodlands",
      capacity: "10 Seats",
      organisedby: "Dr Manoj's A/C",
      // price: "$ 375",
      status: "Open",
    },
  ];

  const handleEnroll = (session) => {
    setSelectedWorkshop(session);
    setSelectedSession(session);
    setShowModal(true);
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[1.5rem] font-normal text-center text-[#6E2D79] mb-12">
          Programs Details
        </h2>

        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-x-auto shadow-lg rounded-2xl border border-[#C183B2]">
              <table className="min-w-full divide-y divide-[#C183B2]">
                <thead>
                  <tr className="bg-[#6E2D79]">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider w-40">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider min-w-[200px]">
                      Event
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider w-32">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider w-20">
                      Participants
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider w-40">
                      Conducted By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#C183B2]">
                  {events.map((session) => (
                    <tr
                      key={session._id}
                      className="hover:bg-purple-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#6E2D79]">
                        {formatEventDateRange(
                          session?.startDate,
                          session?.endDate
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6E2D79] max-w-[250px]">
                        <div
                          className="line-clamp-2 break-words"
                          title={session.event}
                        >
                          {session.event}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-[#6E2D79]">
                        {session.location}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-[#6E2D79] text-center">
                        {session.totalParticipants}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#6E2D79]">
                        {session.conductedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ position: "fixed" }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] flex flex-col"
          >
            <FamilySessionForm
              onClose={() => setShowModal(false)}
              selectedSession={selectedSession}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingSessions;

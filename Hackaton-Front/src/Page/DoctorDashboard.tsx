import { useState } from 'react';
import { Patient } from "../Interface/Patient";
import NavBarLaterale from '../Component/NavBarLaterale';
import PatientData from "../Component/PatientData.tsx";
import { Message } from '../Interface/Message.tsx';
import { Pro } from '../Interface/Pro.tsx';

type DoctorDashboardProps = {
  listPatients: Patient[];
  listMessage: Message[],
  setListMessage:React.Dispatch<React.SetStateAction<Message[]>>
  pro: Pro,
  setPro:React.Dispatch<React.SetStateAction<Pro>>
  setListPatient:React.Dispatch<React.SetStateAction<Patient[]>>
};

export const DoctorDashboard = ({ listPatients, listMessage,setListMessage, pro, setPro, setListPatient }: DoctorDashboardProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-grow">
          <NavBarLaterale />
          <div className="flex-1 overflow-y-auto bg-white drop-shadow-[0_-4px_3px_rgba(0,0,0,0.25)]">
            {!selectedPatient ? (
                <div className="ml-10 mt-10">
                <h1 className="text-2xl text-blue-950 font-bold">
                  Liste des patients :
                </h1>
                {listPatients.map(patient => (
                      <div key={patient.id} className="cursor-pointer p-4 w-screen hover:bg-gray-100" onClick={() => setSelectedPatient(patient)}>
                      {patient.firstname} {patient.lastname}
                    </div>
                  ))}
              </div>
            ) : (
                <PatientData patient={selectedPatient} onBack={() => setSelectedPatient(null)} listMessage={listMessage} setListMessage={setListMessage} pro={pro} setPro={setPro}/>
            )}
          </div>
        </div>
      </div>
  );
};

export default DoctorDashboard;
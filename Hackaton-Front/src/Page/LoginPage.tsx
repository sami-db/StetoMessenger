import React, { useEffect, useState } from "react";
import { Patient } from "../Interface/Patient";
import { Nurse } from "../Interface/Nurse";
import { Pro } from "../Interface/Pro";


type LoginPageProps = {
  setEtat: React.Dispatch<React.SetStateAction<string>>;
  onUserSelect: (userId: number) => void;
  listPatients: Patient[];
  setListPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  setNurse: React.Dispatch<React.SetStateAction<Nurse>>;
  setPro: React.Dispatch<React.SetStateAction<Pro>>;
};

export const LoginPage = ({setEtat, onUserSelect,  setListPatients, listPatients, setPatient, setNurse, setPro}: LoginPageProps) => {
  // État pour stocker les données des patients
  const [listPros, setListPro] = useState<Pro[]>([]);
  const [listNurses, setListNurse] = useState<Nurse[]>([]);
  let listPatientByPro = listPatients

  const handleNurseClick = (nurse: Nurse) => {
    onUserSelect(nurse.id);
    setNurse(nurse);
    let newEtat = "careteam";
    setEtat(newEtat);
    getListPatientByPro(nurse)
  };

  const handlePatientClick = (newPatient: Patient) => {
    onUserSelect(newPatient.id);
    setPatient(newPatient);
    let newEtat = "connect";
    setEtat(newEtat);
  };

  const handleProClick = (newPro: Pro) => {
    onUserSelect(newPro.id);
    setPro(newPro);
    let newEtat = "careteam";
    setEtat(newEtat);
    getListPatientByPro(newPro)
  };

  const getListPatientByPro = async (practitionner: Pro) => { 
    try {
      console.log("Je rentre dans la récupération")
        const response = await fetch("http://localhost:3000/api/getPatientByProId/'" + practitionner.id +"'", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
            // body: JSON.stringify({ careTeamId: patient.id}),
        });
        const data: Patient[] = await response.json();
        console.log(data)
        setListPatients(data)
        listPatientByPro=data
       
        // ...gestion de la réponse
    } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
    }
  }

  useEffect(() => {
    // Fonction pour charger les données des patients
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getPatients");
        const data: Patient[] = await response.json();
        setListPatients(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients :", error);
      }
    };


    fetchPatients();
  }, []);


  useEffect(() => {
    // Fonction pour charger les données des patients
    const fetchPro = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getDoctors");
        const data: Pro[] = await response.json();
        setListPro(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des docteurs :", error);
      }
    };

    fetchPro();
  }, []);

  useEffect(() => {
    // Fonction pour charger les données des patients
    const fetchNurse = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getNurses");
        const data: Nurse[] = await response.json();
        setListNurse(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des nurses :", error);
      }
    };

    fetchNurse();
  }, []);
  return (
    <div className="content-center">
      <div>
        <h1>Liste des patients :</h1>
        <table className="w-2/4 text-center">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Adresse e-mail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listPatients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.firstname}</td>
                <td>{patient.lastname}</td>
                <td>{patient.email}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handlePatientClick(patient)}
                    className="bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 rounded-lg"
                  >
                    <span>Connexion</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h1>Liste des docteurs :</h1>
        <table className="w-2/4 text-center">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listPros.map((docteur, index) => (
              <tr key={index}>
                <td>{docteur.firstname}</td>
                <td>{docteur.lastname}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleProClick(docteur)}
                    className="bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 rounded-lg"
                  >
                    <span>Connexion</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h1>Liste des infirmier(e)s :</h1>
        <table className="w-2/4 text-center">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listNurses.map((nurse, index) => (
              <tr key={index}>
                <td>{nurse.firstname}</td>
                <td>{nurse.lastname}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleProClick(nurse)}
                    className="bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 rounded-lg"
                  >
                    <span>Connexion</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Message } from "../Interface/Message.tsx";
import { Patient } from "../Interface/Patient.tsx";
import { MessageComponent } from "./MessageComponent.tsx";

type ChatBoxComponentProps = {
  patient: Patient;
  toggleChatBox: () => void;
  listMessage: Message[];
  setListMessage: React.Dispatch<React.SetStateAction<Message[]>>;
};

const ChatBoxComponentPatient = ({
  patient,
  toggleChatBox,
  listMessage,
  setListMessage,
}: ChatBoxComponentProps) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const [message, setMessage] = useState<Message>({
    id: null,
    message_content: null,
    message_date: null,
    sender_name: null,
  });
  const [inputValue, setInputValue] = useState<string>("");
  let newListMessage = listMessage;

  function sendMessage(e: any) {
    let newMessage = {
      id: null,
      message_content: inputValue,
      message_date: null,
      sender_name: patient.firstname + patient.lastname,
    };
    setMessage(newMessage);

    console.log(newMessage);
    newListMessage.push(newMessage);
    setListMessage(newListMessage);

    saveMessage(e, newMessage.message_content);
    setInputValue("");
  }

  const saveMessage = async (e: any, content: string) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: patient.id,
          careTeamId: patient.careteamId,
          messageContent: content,
        }),
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  return (
    <div className="bg-slate-100 p-6 rounded-tl-3xl shadow-md fixed top-0 right-0 h-full w-1/4 drop-shadow-[0_-4px_3px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Messagerie</h2>
        <button
          onClick={toggleChatBox}
          className="hover:bg-blue-200 p-2 rounded-full text-2xl px-3"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <MessageComponent listMessage={listMessage} currentUser={patient} />

      <div className="w-11/12 h-auto absolute bottom-4 border-2 border-gray-500 rounded-2xl p-4">
        <div className="space-x-2 space-y-2 text-sm">
          <textarea
            className="w-full p-4 rounded-2xl h-32 resize-none"
            placeholder="Écrire un message..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          ></textarea>
          <button
            type="button"
            className="bg-blue-950 text-2xl text-white px-3 py-2 rounded-full hover:bg-blue-900 absolute bottom-8 right-10 inline-flex items-center justify-center"
            onClick={(event) => sendMessage(event)}
          >
            <i className="bi bi-send"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxComponentPatient;

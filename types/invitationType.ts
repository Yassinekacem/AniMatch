export type invitationType = {
    id: number;
    senderId: number;
    receiverId: number;
    animalId: number;
    status: "pended" | "accepted" | "rejected";
    date: Date;
  };
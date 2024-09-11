export type invitationType = {
    id: number;
    senderId: number;
    receiverId: number;
    animalId: number;
    status: "pended" | "accepted" | "rejected";
   senderPhoto: string;
    senderName: string;
    animalName : string;
    animalGender : string;
    animalSpecies : string;
    animalAge : number;
    animalCity : string;
    animalBreed : string;
    animalVaccinated : boolean;
    animalTrained : boolean;
    animalFriendly : boolean;
    description : string;
    images : string[];
    NumTel: string;

  };
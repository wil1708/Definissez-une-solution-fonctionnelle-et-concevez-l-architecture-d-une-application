export interface MessageSynchrone {
    id: number;
    contenu: string;
    dateCreation: Date;
    utilisateur: {
        id: number;
        nom: string;
        email: string;
        isCustomer: boolean;
    };
    discussionId: number;
}

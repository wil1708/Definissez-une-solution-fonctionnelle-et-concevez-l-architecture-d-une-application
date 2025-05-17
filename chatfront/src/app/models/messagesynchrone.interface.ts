export interface MessageSynchrone {
    id: number;
    contenu: string;
    dateCreation: string; // Using `string` since dates are received as ISO format
    utilisateur: {
        id: number;
        nom: string;
        email: string;
        isCustomer: boolean;
    };
    discussionId: number;
}

export interface Livro {
    autor: string;
    nome: string;
    totalPaginas: number;
    id: number;

    dono: string;
    estado: string;//lendo, lido, lerei

    nota?: number;
    paginalAtual?: number;
    docId?: string;
}

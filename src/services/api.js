import axios from 'axios';

const generateQuestionsApi = async (conteudo) => {
    try {
        const response = await axios.post('http://localhost:8000/gerar-questao/', {
            content: conteudo,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao gerar questão:', error);
        throw error; // Rejogar o erro para o tratamento no componente
    }
};

export { generateQuestionsApi };

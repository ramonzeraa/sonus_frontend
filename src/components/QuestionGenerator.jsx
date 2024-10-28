import React, { useEffect, useState } from 'react';
import { generateQuestionsApi } from '../services/api';
import './QuestionGenerator.css';

const QuestionGenerator = () => {
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleGenerateQuestion = async () => {
        setLoading(true);
        setFeedback(''); // Limpa feedback anterior
        setSelectedOption(''); // Limpa seleção anterior

        try {
            const response = await generateQuestionsApi("Tema de exemplo");
            console.log("Resposta da API:", response); // Verificar a resposta

            if (response) {
                const { questao, alternativas, resposta_correta } = response; 
                setQuestion(questao);
                setOptions(alternativas || []);
                setCorrectAnswer(resposta_correta);
            } else {
                setFeedback("Erro ao gerar a questão.");
            }
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            setFeedback("Erro ao gerar a questão.");
        } finally {
            setLoading(false); // Garante que o loading seja sempre removido
        }
    };

    const handleCheckAnswer = () => {
        if (selectedOption === correctAnswer) {
            setFeedback("✅ Resposta correta! Você é incrível!");
        } else {
            setFeedback("❌ Resposta incorreta! Mas você está indo muito bem!");
        }
    };

    useEffect(() => {
        handleGenerateQuestion(); // Gera uma questão ao iniciar
    }, []);

    return (
        <div className="container">
            <h2>Questão Gerada</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="question-box">
                    {question && <p className="question">{question}</p>}
                    <div className="options">
                        {options.length > 0 ? (
                            options.map((option, index) => (
                                <label key={index} className="option">
                                    <input
                                        type="radio"
                                        name="question"
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    />
                                    {option}
                                </label>
                            ))
                        ) : (
                            <p>Nenhuma alternativa disponível.</p>
                        )}
                    </div>
                    <button onClick={handleCheckAnswer} className="btn">
                        Verificar Resposta
                    </button>
                    {feedback && <p className="feedback">{feedback}</p>}
                    <button onClick={handleGenerateQuestion} className="btn">
                        Gerar Nova Questão
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuestionGenerator;

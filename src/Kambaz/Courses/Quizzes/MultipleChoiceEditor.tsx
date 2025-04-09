import { useState, useEffect } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

interface MultipleChoiceEditorProps {
    // eslint-disable-next-line
    question: any;
    // eslint-disable-next-line
    onSave: (question: any) => void;
    onCancel: () => void;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({ question, onSave, onCancel }) => {
    const [title, setTitle] = useState<string>(question?.title || '');
    const [points, setPoints] = useState<number>(question?.points || 0);
    const [questionText, setQuestionText] = useState<string>(question?.question || '');
    const [choices, setChoices] = useState<string[]>(question?.choices || ['']);
    const [correctAnswer, setCorrectAnswer] = useState<number>(question?.correctAnswer || 0);

    useEffect(() => {
        if (question) {
            setTitle(question.title);
            setPoints(question.points);
            setQuestionText(question.question);
            setChoices(question.choices || []);
            setCorrectAnswer(question.correctAnswer || 0);
        }
    }, [question]);

    const handleChoiceChange = (index: number, value: string) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = value;
        setChoices(updatedChoices);
    };

    const handleAddChoice = () => {
        setChoices([...choices, '']);
    };

    const handleRemoveChoice = (index: number) => {
        const updatedChoices = choices.filter((_, i) => i !== index);
        setChoices(updatedChoices);
        if (index === correctAnswer && choices.length > 0) {
            setCorrectAnswer(0);
        }
    };

    const handleSave = () => {
        const updatedQuestion = {
            title,
            text: questionText,
            type: "Multiple Choice",
            answer: "",
            points,
            choices,
            correctAnswer,
        };
        onSave(updatedQuestion);
    };

    return (
        <div className="border p-3 my-3">
            <h5>{question ? "Edit Question" : "New Question"}</h5>

            <Row className="mb-3 align-items-end">
                <Col md={5}>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title of the question"
                    />
                </Col>
                <Col md={4} className="ps-2">
                    <Form.Select value="Multiple Choice" disabled>
                        <option>Multiple Choice</option>
                    </Form.Select>
                </Col>
                <Col md={3} className="d-flex align-items-center">
                    <span className="me-2"><b>pts:</b></span>
                    <Form.Control
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        placeholder="Points"
                        min={0}
                    />
                </Col>
            </Row>

            <div className="mb-4">
                <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Question:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter the question here"
                />
            </div>

            <div className="mb-3">
                <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Answers:</Form.Label>
                {choices.map((choice, index) => (
                    <Row className="mb-2 align-items-center" key={index}>
                        <Col md={1} className="text-center">
                            <Form.Check
                                type="radio"
                                id={`correct-${index}`}
                                name="correctAnswer"
                                checked={index === correctAnswer}
                                onChange={() => setCorrectAnswer(index)}
                            />
                        </Col>
                        <Col md={2} className="text-end pe-0">
                            <Form.Label className="mb-0">Choice {index + 1}:</Form.Label>
                        </Col>
                        <Col md={7}>
                            <Form.Control
                                value={choice}
                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                placeholder={`Enter option ${index + 1}`}
                            />
                        </Col>
                        <Col md={2}>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveChoice(index)}
                                className="w-100"
                            >
                                Remove
                            </Button>
                        </Col>
                    </Row>
                ))}
                <div className="text-center mt-3 mb-3">
                    <Button
                        variant="secondary"
                        onClick={handleAddChoice}
                        className="px-4"
                    >
                        + Add Choice
                    </Button>
                </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Question
                </Button>
            </div>
        </div>
    );
};

export default MultipleChoiceEditor;
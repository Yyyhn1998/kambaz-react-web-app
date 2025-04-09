import { useState, useEffect } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

interface FillInBlankEditorProps {
    // eslint-disable-next-line
    question: any;
    // eslint-disable-next-line
    onSave: (question: any) => void;
    onCancel: () => void;
}

const FillInBlankEditor: React.FC<FillInBlankEditorProps> = ({ question, onSave, onCancel }) => {
    const [title, setTitle] = useState<string>(question?.title || '');
    const [points, setPoints] = useState<number>(question?.points || 0);
    const [questionText, setQuestionText] = useState<string>(question?.question || '');
    const [possibleAnswers, setPossibleAnswers] = useState<string[]>(question?.possibleAnswers || ['']);
    const [caseSensitive, setCaseSensitive] = useState<boolean>(question?.caseSensitive || false);

    useEffect(() => {
        if (question) {
            setTitle(question.title || '');
            setPoints(question.points || 0);
            setQuestionText(question.question || '');
            setPossibleAnswers(question.possibleAnswers || ['']);
            setCaseSensitive(question.caseSensitive || false);
        }
    }, [question]);

    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...possibleAnswers];
        updatedAnswers[index] = value;
        setPossibleAnswers(updatedAnswers);
    };

    const handleAddAnswer = () => {
        setPossibleAnswers([...possibleAnswers, '']);
    };

    const handleRemoveAnswer = (index: number) => {
        const updatedAnswers = possibleAnswers.filter((_, i) => i !== index);
        setPossibleAnswers(updatedAnswers);
    };

    const handleSave = () => {
        const updatedQuestion = {
            title,
            points,
            question: questionText,
            possibleAnswers,
            caseSensitive,
            type: 'Fill in the Blank'
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
                    <Form.Select value="Fill in the Blank" disabled>
                        <option>Fill in the Blank</option>
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
                    placeholder="Enter the question with [blank] to indicate where students should fill in"
                />
                <Form.Text className="text-muted">
                    Tip: Use [blank] in your text to indicate where the blank should appear.
                </Form.Text>
            </div>

            <div className="mb-4">
                <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Possible Answers:</Form.Label>
                {possibleAnswers.map((answer, index) => (
                    <Row key={index} className="mb-2 align-items-center">
                        <Col md={9}>
                            <Form.Control
                                value={answer}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                placeholder={`Possible answer ${index + 1}`}
                            />
                        </Col>
                        <Col md={3}>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveAnswer(index)}
                                className="w-100"
                                disabled={possibleAnswers.length <= 1}
                            >
                                Remove
                            </Button>
                        </Col>
                    </Row>
                ))}
                <div className="text-center mt-3 mb-3">
                    <Button
                        variant="secondary"
                        onClick={handleAddAnswer}
                        className="px-4"
                    >
                        + Add Another Answer
                    </Button>
                </div>
            </div>

            <div className="mb-4">
                <Form.Check
                    type="checkbox"
                    id="case-sensitive"
                    label="Case sensitive answers"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="mb-2"
                />
                <Form.Text className="text-muted">
                    If checked, student answers must match case exactly. If unchecked, "ANSWER" and "answer" will be treated the same.
                </Form.Text>
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

export default FillInBlankEditor;
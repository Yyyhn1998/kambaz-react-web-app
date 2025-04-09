import { useState, useEffect } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

interface TrueAndFalseEditorProps {
    // eslint-disable-next-line
    question: any;
    // eslint-disable-next-line
    onSave: (question: any) => void;
    onCancel: () => void;
}

const TrueAndFalseEditor: React.FC<TrueAndFalseEditorProps> = ({ question, onSave, onCancel }) => {
    const [title, setTitle] = useState<string>(question?.title || '');
    const [points, setPoints] = useState<number>(question?.points || 0);
    const [questionText, setQuestionText] = useState<string>(question?.question || '');
    const [correctAnswer, setCorrectAnswer] = useState<boolean>(question?.correctAnswer || false);

    useEffect(() => {
        if (question) {
            setTitle(question.title || '');
            setPoints(question.points || 0);
            setQuestionText(question.question || '');
            setCorrectAnswer(question.correctAnswer || false);
        }
    }, [question]);

    const handleSave = () => {
        const updatedQuestion = {
            title,
            points,
            question: questionText,
            correctAnswer,
            type: 'True/False'
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
                    <Form.Select value="True/False" disabled>
                        <option>True/False</option>
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

            <div className="mb-4">
                <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Correct Answer:</Form.Label>
                <div className="d-flex justify-content-start gap-4 ms-2">
                    <Form.Check
                        type="radio"
                        id="true-answer"
                        label="True"
                        name="correctAnswer"
                        checked={correctAnswer === true}
                        onChange={() => setCorrectAnswer(true)}
                        className="fw-bold"
                    />
                    <Form.Check
                        type="radio"
                        id="false-answer"
                        label="False"
                        name="correctAnswer"
                        checked={correctAnswer === false}
                        onChange={() => setCorrectAnswer(false)}
                        className="fw-bold"
                    />
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

export default TrueAndFalseEditor;